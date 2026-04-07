# Changelog

## App & Layout Refresh (April 2026)

We also completed a broader app refactor to improve stability and maintainability:

- The app structure was cleaned up and modernized for current Next.js standards.
- Core layout and navigation were reorganized for more consistent behavior across pages.
- Routing and rendering setup was streamlined to reduce edge-case loading issues.
- General cleanup was applied to support better long-term performance and easier updates.

## Blog & SEO Update (April 2026)

We improved the blog experience and search preview quality:

- Blog pages now load server-side on refresh, so content appears faster and more reliably.
- Single blog articles use improved metadata for title, description, and social sharing previews.
- We removed old Helmet-based SEO handling and now use modern Next.js metadata.
- Structured data for blog pages stays in place to help search engines understand content better.
- Minor fixes were included for cleaner page rendering and more stable behavior.
- Service page update: `/reinigung/bueroreinigung` now renders fully server-side for faster, more stable refresh behavior.
- Auth update: removed technical debug logs from the app console for a cleaner user-facing browser experience.

These updates are focused on better visibility in search, cleaner sharing previews, and a smoother reading experience.

## Authentication & Dashboard UX Update (April 2026)

We improved login/session reliability and made dashboard loading feel much smoother:

- Supabase client setup was standardized across server and browser usage to align with current SSR patterns.
- Security fix: removed hardcoded Supabase URL/key fallback values (e.g. `process.env... || '...'`) so credentials/config now come strictly from environment variables.
- Auth/session handling was simplified to reduce race conditions and refresh edge cases during login.
- Login flow typing and runtime issues were fixed to prevent build-time failures and unstable redirects.
- Dashboard loading states were redesigned with a proper skeleton UI instead of spinner-only placeholders.
- Partner dashboard loading now stays visually consistent across route-level and component-level loading states.
- General cleanup removed outdated/duplicated auth path logic that could cause conflicting behavior.

These updates focus on more stable authentication, fewer unexpected login redirects, and a cleaner dashboard experience while data initializes.
