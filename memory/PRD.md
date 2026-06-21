# Koffelo PRD & Project Memory

> Live working memory for the Koffelo storefront. Pair with `/app/DOCS.md`
> for the full architectural reference.

## Problem statement (original)

Redesign the existing "Koffelo" / Morning Brew coffee storefront UI/UX to be
premium, rich, editorial, and fully mobile responsive. Light theme only, no
dark mode. Preserve all existing backend integrations, routing, cart, auth,
and Razorpay payment flows. Provide a graceful preview mode so the site
works without the backend API configured.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand + TanStack Query
- Backend: separate Node/Express + PostgreSQL + Razorpay service (Koffelo API)
- Fonts: Playfair Display (display) + CirceRounded (body)

## What has been implemented

### Phase 1 — Design system
- New "Atelier Koffelo" palette: ivory cream backgrounds, deep coffee text,
  burnt copper accent (replaced amber gold for richer feel)
- Typography pairing: Playfair Display + CirceRounded
- Full token system in `tailwind.config.ts` (`k-*` colors, display sizes,
  shadows, animations, easings)
- Utility classes in `globals.css` (`container-koffee`, `eyebrow`, `link-underline`,
  `hover-lift`, `img-hover-zoom`, `grain-overlay`, `btn-pill-*`)

### Phase 2 — Homepage
9 distinct editorial sections, all light theme except the single copper
manifesto section for visual punch:
1. `Hero` — Asymmetric split, Unsplash coffee imagery, stat tiles, marquee
2. `Chapters` (II–IV) — Alternating image+text rows with copper frames
3. `FeaturedSections` (Collection) — 6-card grid, `<Link>` navigation, hover
   reveals "View Product" CTA, mobile-always-visible
4. `NumbersBar` — Animated count-up stats
5. `Manifesto` — Single copper section with big blockquote
6. `Testimonials` — Tab list + paper quote card
7. `FAQ` — Sticky header + accordion with rotating ± icon
8. `Newsletter` — Bordered glass card
9. `Footer` — Giant "Koffelo." wordmark + 4-column links

### Phase 3 — Product detail page
- Server component at `/product/[productId]/page.tsx` that intelligently
  routes between `ProductDetails` (real API) and `ProductPreview` (fallback)
- `ProductPreview.tsx` — Premium product page using `_fallbackCatalogue.ts`,
  includes breadcrumb, image, tasting notes, origin/roast, qty selector,
  "Add to bag" CTA, cross-sell row
- Graceful degradation: 404 → preview if known ID, real notFound otherwise

### Phase 4 — Other pages
- `/cart` — Atelier-styled loading + empty-bag premium state (no more
  stuck spinner when API is unreachable)
- `/aboutus` — Hero header retinted to Atelier theme (matches homepage)
- `/account`, `/orders`, `/auth/*` — preserved as-is (functional)

### Phase 5 — API readiness
- All flows route through `axiosInstance` reading `NEXT_PUBLIC_API_URL`
- `.env.local` placeholder ready — user drops in URL + restarts frontend
- `endpoint.ts` matches backend repo routes exactly (products, cart, orders,
  addresses, payments, reviews, OTP auth, pincode, image upload)
- Preview mode kicks in when env is empty or API errors — site never crashes

### Phase 6 — Documentation
- `/app/DOCS.md` — Full developer documentation (~440 lines)
- `/app/memory/PRD.md` — This file, working memory + change log
- `/app/.env.local` — Annotated env with clear instructions

## Architecture decisions

- **`<Link>` not `onClick`** for card navigation — eliminates hydration
  flake on mobile
- **Single source of truth** for endpoints (`src/endpoint.ts`) and design
  tokens (`tailwind.config.ts`)
- **Shared fallback catalogue** consumed by both collection grid and
  product preview page — IDs 1-6 match across both
- **Server component** for product detail page (SEO + initial paint)
- **Italic copper headline emphasis** as repeated brand-cohesion pattern
- **Roman numeral chapters** (I-IX) as editorial through-line

## Test credentials

No auth credentials were created during the redesign — the existing OTP
auth flow (phone/email → 6-digit OTP via `/api/auth/sendOrResend-otp`)
remains the only login method. Test by replacing `NEXT_PUBLIC_API_URL`
with the production URL.

## Known limitations / future work

- **Newsletter signup** — purely client-side confirmation; no backend
  endpoint for it currently exists. Wire to `/api/newsletter` when added.
- **Search** — not implemented (small catalogue, not currently needed)
- **Wishlist** — not implemented
- **i18n** — English only, INR only
- **`next/image`** — using `<img>` for flexibility with Unsplash preview
  URLs. Migrate to `next/image` once images are on your own CDN.

## How to validate when API is wired up

1. Set `NEXT_PUBLIC_API_URL=<your-url>` in `/app/.env.local`
2. `sudo supervisorctl restart frontend`
3. Verify:
   - Homepage Collection shows real products (not fallback)
   - Click a product card → real ProductDetails page renders (not preview)
   - Cart loads with real items (or shows empty state if none)
   - OTP login → cart merges from guest → user
   - Add to cart → checkout → Razorpay → order created

## Next action items (when prioritized)

- [ ] Wire newsletter signup to a backend endpoint (if/when added)
- [ ] Migrate `<img>` → `next/image` after switching to own CDN
- [ ] Lighthouse audit + performance pass
- [ ] Add product search / category filtering if catalogue grows
- [ ] Restyle `/account`, `/orders` pages to match Atelier theme
