import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import zlib from 'zlib';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const gzip = promisify(zlib.gzip);
// Brotli is available in Node.js 11.7.0+
const hasBrotli = typeof zlib.brotliCompress === 'function';
const brotliCompress = hasBrotli ? promisify(zlib.brotliCompress) : null;

const BUILD_DIR = path.join(__dirname, '..', 'dist');

// File extensions to compress
const EXTENSIONS = ['.js', '.css', '.html'];

// Recursively find all files with matching extensions
function findFiles(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      // Recursively search subdirectories
      results = results.concat(findFiles(filePath, extensions));
    } else {
      // Check if file extension matches
      const ext = path.extname(filePath);
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });

  return results;
}

// Compress file with gzip
async function compressGzip(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const compressed = await gzip(fileContent, { level: 9 });
    const outputPath = filePath + '.gz';
    fs.writeFileSync(outputPath, compressed);
    console.log(`✓ Gzipped: ${path.relative(BUILD_DIR, filePath)}`);
  } catch (error) {
    console.error(`✗ Error gzipping ${filePath}:`, error.message);
  }
}

// Compress file with brotli
async function compressBrotli(filePath) {
  if (!brotliCompress) {
    return;
  }
  try {
    const fileContent = fs.readFileSync(filePath);
    const compressed = await brotliCompress(fileContent, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // Maximum quality
      },
    });
    const outputPath = filePath + '.br';
    fs.writeFileSync(outputPath, compressed);
    console.log(`✓ Brotli compressed: ${path.relative(BUILD_DIR, filePath)}`);
  } catch (error) {
    console.error(`✗ Error brotli compressing ${filePath}:`, error.message);
  }
}

// Main function
async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`✗ Build directory not found: ${BUILD_DIR}`);
    console.error(`\n💡 Please run 'npm run build' first to create the dist directory.`);
    process.exit(1);
  }

  console.log('🔍 Finding files to compress...');
  const files = findFiles(BUILD_DIR, EXTENSIONS);
  console.log(`📦 Found ${files.length} files to compress\n`);

  if (files.length === 0) {
    console.log('⚠ No files found to compress');
    return;
  }

  console.log('🗜️  Compressing with Gzip...');
  for (const file of files) {
    await compressGzip(file);
  }

  if (hasBrotli && brotliCompress) {
    console.log('\n🗜️  Compressing with Brotli...');
    for (const file of files) {
      await compressBrotli(file);
    }
  } else {
    console.log('\n⚠️  Brotli compression not available (requires Node.js 11.7.0+)');
  }

  console.log(`\n✅ Compression complete! ${files.length} files processed.`);
}

main().catch(error => {
  console.error('✗ Fatal error:', error);
  process.exit(1);
});

