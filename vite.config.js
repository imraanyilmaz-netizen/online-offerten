import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';
import inlineEditPlugin from './plugins/visual-editor/vite-plugin-react-inline-editor.js';
import editModeDevPlugin from './plugins/visual-editor/vite-plugin-edit-mode.js';
import iframeRouteRestorationPlugin from './plugins/vite-plugin-iframe-route-restoration.js';
import selectionModePlugin from './plugins/selection-mode/vite-plugin-selection-mode.js';

const isDev = process.env.NODE_ENV !== 'production';

const configHorizonsViteErrorHandler = `
const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const addedNode of mutation.addedNodes) {
			if (
				addedNode.nodeType === Node.ELEMENT_NODE &&
				(
					addedNode.tagName?.toLowerCase() === 'vite-error-overlay' ||
					addedNode.classList?.contains('backdrop')
				)
			) {
				handleViteOverlay(addedNode);
			}
		}
	}
});

observer.observe(document.documentElement, {
	childList: true,
	subtree: true
});

function handleViteOverlay(node) {
	if (!node.shadowRoot) {
		return;
	}

	const backdrop = node.shadowRoot.querySelector('.backdrop');

	if (backdrop) {
		const overlayHtml = backdrop.outerHTML;
		const parser = new DOMParser();
		const doc = parser.parseFromString(overlayHtml, 'text/html');
		const messageBodyElement = doc.querySelector('.message-body');
		const fileElement = doc.querySelector('.file');
		const messageText = messageBodyElement ? messageBodyElement.textContent.trim() : '';
		const fileText = fileElement ? fileElement.textContent.trim() : '';
		const error = messageText + (fileText ? ' File:' + fileText : '');

		window.parent.postMessage({
			type: 'horizons-vite-error',
			error,
		}, '*');
	}
}
`;

const configHorizonsRuntimeErrorHandler = `
window.onerror = (message, source, lineno, colno, errorObj) => {
	const errorDetails = errorObj ? JSON.stringify({
		name: errorObj.name,
		message: errorObj.message,
		stack: errorObj.stack,
		source,
		lineno,
		colno,
	}) : null;

	window.parent.postMessage({
		type: 'horizons-runtime-error',
		message,
		error: errorDetails
	}, '*');
};
`;

const configHorizonsConsoleErrroHandler = `
const originalConsoleError = console.error;
console.error = function(...args) {
	originalConsoleError.apply(console, args);

	let errorString = '';

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg instanceof Error) {
			errorString = arg.stack || \`\${arg.name}: \${arg.message}\`;
			break;
		}
	}

	if (!errorString) {
		errorString = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
	}

	window.parent.postMessage({
		type: 'horizons-console-error',
		error: errorString
	}, '*');
};
`;

const configWindowFetchMonkeyPatch = `
const originalFetch = window.fetch;

window.fetch = function(...args) {
	const url = args[0] instanceof Request ? args[0].url : args[0];

	// Skip WebSocket URLs
	if (url.startsWith('ws:') || url.startsWith('wss:')) {
		return originalFetch.apply(this, args);
	}

	return originalFetch.apply(this, args)
		.then(async response => {
			const contentType = response.headers.get('Content-Type') || '';

			// Exclude HTML document responses
			const isDocumentResponse =
				contentType.includes('text/html') ||
				contentType.includes('application/xhtml+xml');

			if (!response.ok && !isDocumentResponse) {
					const responseClone = response.clone();
					const errorFromRes = await responseClone.text();
					const requestUrl = response.url;
					console.error(\`Fetch error from \${requestUrl}: \${errorFromRes}\`);
			}

			return response;
		})
		.catch(error => {
			if (!url.match(/\.html?$/i)) {
				console.error(error);
			}

			throw error;
		});
};
`;

const configNavigationHandler = `
if (window.navigation && window.self !== window.top) {
	window.navigation.addEventListener('navigate', (event) => {
		const url = event.destination.url;

		try {
			const destinationUrl = new URL(url);
			const destinationOrigin = destinationUrl.origin;
			const currentOrigin = window.location.origin;

			if (destinationOrigin === currentOrigin) {
				return;
			}
		} catch (error) {
			return;
		}

		window.parent.postMessage({
			type: 'horizons-navigation-error',
			url,
		}, '*');
	});
}
`;

const addTransformIndexHtml = {
	name: 'add-transform-index-html',
	transformIndexHtml(html) {
		// Optimize CSS loading - make it non-blocking using media="print" trick
		// This prevents CSS from blocking the initial render
		html = html.replace(
			/<link([^>]*rel=["']stylesheet["'][^>]*?)>/gi,
			(match, attrs) => {
				// Skip if already has media or onload attribute (already optimized)
				if (attrs.includes('media=') || attrs.includes('onload=')) {
					return match;
				}
				// Add media="print" and onload to make it async (non-blocking)
				// When CSS loads, it switches to media="all" automatically
				return `<link${attrs} media="print" onload="this.media='all'; this.onload=null;" /><noscript>${match}</noscript>`;
			}
		);

		const tags = [
			{
				tag: 'script',
				attrs: { type: 'module' },
				children: configHorizonsRuntimeErrorHandler,
				injectTo: 'head',
			},
			{
				tag: 'script',
				attrs: { type: 'module' },
				children: configHorizonsViteErrorHandler,
				injectTo: 'head',
			},
			{
				tag: 'script',
				attrs: {type: 'module'},
				children: configHorizonsConsoleErrroHandler,
				injectTo: 'head',
			},
			{
				tag: 'script',
				attrs: { type: 'module' },
				children: configWindowFetchMonkeyPatch,
				injectTo: 'head',
			},
			{
				tag: 'script',
				attrs: { type: 'module' },
				children: configNavigationHandler,
				injectTo: 'head',
			},
		];

		if (!isDev && process.env.TEMPLATE_BANNER_SCRIPT_URL && process.env.TEMPLATE_REDIRECT_URL) {
			tags.push(
				{
					tag: 'script',
					attrs: {
						src: process.env.TEMPLATE_BANNER_SCRIPT_URL,
						'template-redirect-url': process.env.TEMPLATE_REDIRECT_URL,
					},
					injectTo: 'head',
				}
			);
		}

		return {
			html,
			tags,
		};
	},
};

console.warn = () => {};

const logger = createLogger()
const loggerError = logger.error

logger.error = (msg, options) => {
	if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
		return;
	}

	loggerError(msg, options);
}

export default defineConfig({
	base: '/',
	customLogger: logger,
	plugins: [
		...(isDev ? [inlineEditPlugin(), editModeDevPlugin(), iframeRouteRestorationPlugin(), selectionModePlugin()] : []),
		react(),
		addTransformIndexHtml
	],
	server: {
		cors: true,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
		},
		allowedHosts: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json', ],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		target: 'es2015',
		minify: 'terser',
		cssMinify: true,
		sourcemap: false,
		cssCodeSplit: true,
		reportCompressedSize: false,
		assetsInlineLimit: 8192, // Inline small assets (< 8KB) to reduce HTTP requests
		publicDir: 'public', // Ensure public directory (including sw.js) is copied to build
		chunkSizeWarningLimit: 300, // Warn if chunks exceed 300KB (reduced for better performance)
		rollupOptions: {
			external: [
				'@babel/parser',
				'@babel/traverse',
				'@babel/generator',
				'@babel/types'
			],
				output: {
				manualChunks: (id) => {
					// More aggressive code splitting to reduce unused JavaScript
					// IMPORTANT: Order matters - React must be loaded first
					
					// Only process node_modules to avoid circular dependencies
					if (!id.includes('node_modules')) {
						return undefined;
					}
					
					// React core - MUST be in same chunk and loaded FIRST
					// Only match exact React core packages, not other packages with "react" in name
					if (
						id.includes('/node_modules/react/') ||
						id.includes('/node_modules/react-dom/') ||
						id.includes('/node_modules/react-dom-client/')
					) {
						return 'react-vendor';
					}
					
					// React Router - depends on React, keep together
					if (id.includes('/node_modules/react-router')) {
						return 'react-vendor';
					}
					
					// All Radix UI components - UI library (depends on React)
					// Split into smaller chunks to reduce unused code
					// Critical components for initial load (keep in smaller chunks)
					if (id.includes('@radix-ui/react-slot')) {
						return 'ui-slot'; // Used by Button - critical for Hero
					}
					if (id.includes('@radix-ui/react-dropdown-menu')) {
						return 'ui-dropdown'; // Used by Navbar - critical
					}
					if (id.includes('@radix-ui/react-toast')) {
						return 'ui-toast'; // Used by App.jsx - critical
					}
					// Less critical components - can be lazy loaded
					if (id.includes('@radix-ui/react-accordion')) {
						return 'ui-accordion';
					}
					if (id.includes('@radix-ui/react-dialog')) {
						return 'ui-dialog';
					}
					if (id.includes('@radix-ui/react-select')) {
						return 'ui-select';
					}
					if (id.includes('@radix-ui/react-tabs')) {
						return 'ui-tabs';
					}
					// Other Radix UI components - lazy load when needed
					if (id.includes('@radix-ui')) {
						return undefined; // Let Vite handle dynamically
					}
					
					// Lucide React icons - UI library (depends on React)
					// Split icons into separate chunk - they're tree-shakeable
					if (id.includes('lucide-react')) {
						return 'icons-vendor';
					}
					
					// Animation library (depends on React)
					// Don't create separate chunk - let it be code-split per component
					// This reduces unused code on pages that don't use animations
					if (id.includes('framer-motion')) {
						return undefined; // Let Vite handle it dynamically for better tree-shaking
					}
					
					// i18n internationalization (depends on React)
					if (id.includes('i18next') || id.includes('react-i18next')) {
						return 'i18n-vendor';
					}
					
					// Supabase client - NEVER bundle on initial load
					// Force dynamic import for all Supabase usage
					// This significantly reduces initial bundle size (~50-100KB savings)
					// undefined ensures Vite uses dynamic imports (lazy loading)
					if (id.includes('@supabase/supabase-js')) {
						return undefined; // Force dynamic import - prevents initial bundle inclusion
					}
					// Also exclude Supabase client files from initial chunks
					// Force dynamic import to prevent eager bundling
					if (id.includes('/lib/supabaseClient') || id.includes('/lib/customSupabaseClient')) {
						return undefined; // Force dynamic import - prevents initial bundle inclusion
					}
					// Exclude SupabaseAuthContext from initial bundle if possible
					// Note: This may not work if it's eagerly imported, but helps with tree-shaking
					if (id.includes('SupabaseAuthContext') && !id.includes('main.jsx') && !id.includes('App.jsx')) {
						return 'auth-vendor'; // Separate chunk for auth-related code
					}
					
					// Utility libraries (no React dependency)
					if (id.includes('date-fns') || id.includes('clsx') || id.includes('tailwind-merge') || id.includes('uuid')) {
						return 'utils-vendor';
					}
					
					// Tiptap editor - only used in admin panel (depends on React)
					// Lazy load this heavy library
					if (id.includes('@tiptap')) {
						return 'editor-vendor';
					}
					
					// PDF generation - lazy loaded (no React dependency)
					// This should only load when PDF is generated
					// Don't create separate chunk - let it be lazy loaded dynamically
					// This prevents it from being loaded on the homepage
					if (id.includes('jspdf')) {
						return undefined; // Let Vite handle it dynamically
					}
					
					// Stripe - lazy loaded on payment pages (no React dependency)
					if (id.includes('stripe') || id.includes('@stripe')) {
						return 'stripe-vendor';
					}
					
					// HTML to Canvas - heavy library, lazy loaded (no React dependency)
					if (id.includes('html2canvas')) {
						return 'canvas-vendor';
					}
					
					// DOMPurify - security library (no React dependency)
					if (id.includes('dompurify') || id.includes('purify')) {
						return 'security-vendor';
					}
					
					// Split large vendor packages
					if (id.includes('react-icons')) {
						return 'icons-vendor';
					}
					if (id.includes('react-ga4')) {
						return 'analytics-vendor';
					}
					if (id.includes('howler')) {
						return 'audio-vendor';
					}
					
					// For other node_modules, let Vite handle automatic chunking
					// This prevents circular dependencies
					return undefined;
				},
				entryFileNames: 'assets/[name]-[hash].js',
				chunkFileNames: (chunkInfo) => {
					// Ensure react-vendor loads first
					if (chunkInfo.name === 'react-vendor') {
						return 'assets/react-vendor-[hash].js';
					}
					return 'assets/[name]-[hash].js';
				},
				assetFileNames: (assetInfo) => {
					const info = assetInfo.name.split('.');
					const ext = info[info.length - 1];
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
						return `assets/images/[name]-[hash][extname]`;
					}
					if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
						return `assets/fonts/[name]-[hash][extname]`;
					}
					return `assets/[name]-[hash][extname]`;
				}
			}
		},
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.debug'],
				passes: 3, // Increased from 2 to 3 for better compression
				dead_code: true,
				unused: true,
				unsafe: true, // Enable unsafe optimizations
				unsafe_comps: true, // Optimize comparisons
				unsafe_math: true, // Optimize math expressions
				unsafe_methods: true, // Optimize method calls
				unsafe_proto: true, // Optimize prototype access
				unsafe_regexp: true, // Optimize regexp
				unsafe_undefined: true, // Optimize undefined
				conditionals: true,
				evaluate: true,
				booleans: true,
				loops: true,
				hoist_funs: true,
				keep_infinity: true,
				side_effects: false
			},
			mangle: {
				safari10: true,
				properties: false // Don't mangle properties to avoid breaking code
			},
			format: {
				comments: false // Remove all comments
			}
		}
	}
});
