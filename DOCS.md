# Koffelo — Project Documentation

> **Read this file first.** Everything below is what you need to understand,
> navigate, and extend the Koffelo storefront without re-reading the entire
> repository. Last updated: Feb 2026.

---

## 1. What this is

**Koffelo Atelier** — a premium artisanal coffee e-commerce storefront for the
Koffelo / Morning Brew brand. The frontend (this repo) is a single Next.js 14
application. The backend is a separate Node/Express + PostgreSQL service
(Koffelo API) that lives in its own repository; this app talks to it over HTTP.

**Brand voice:** Editorial, considered, "atelier"-grade. Roman-numeral chapters,
serif headlines, italic copper accents, generous whitespace, light cream
backgrounds dominant.

**Tech stack**

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui primitives |
| State | Zustand (cart, auth modal) + TanStack Query (server data) |
| HTTP | Axios (shared `axiosInstance`) |
| Forms | Native React state |
| Fonts | Playfair Display (display serif, via `next/font/google`) + CirceRounded (body, local OTF) |
| Payments | Razorpay (via backend `/api/payments/*`) |
| Analytics | Google Tag Manager (`GTM-TMRTQV4H`) + custom GTM helpers |
| Auth | OTP-based (phone/email) via backend |

---

## 2. Folder layout

```
/app
├── .env.local              # NEXT_PUBLIC_API_URL lives here (gitignored)
├── package.json            # Scripts: dev / start / build / lint
├── tailwind.config.ts      # Design tokens (colors, typography, animations)
├── next.config.mjs
├── public/
│   ├── assets/             # Brand assets (logo, hero1, philosophy, etc.)
│   ├── Videos/             # noc.webm, bannervideo.webm (not used currently)
│   └── fonts/
└── src/
    ├── endpoint.ts         # All backend route paths (single source of truth)
    ├── utils/
    │   ├── axiosInstance.ts    # Shared axios — reads NEXT_PUBLIC_API_URL
    │   ├── cookieHelper.ts     # token / sessionId / user cookies
    │   ├── gtm.ts              # GTM dataLayer push
    │   └── GTMEventManager.ts  # GTM event helpers
    ├── store/
    │   └── useCartStore.ts     # Zustand: cart items + auth modal state
    ├── provider/
    │   └── queryProvider.tsx   # TanStack Query setup + useGetAddresses
    ├── hooks/
    ├── lib/
    ├── components/
    │   └── ui/                 # shadcn/ui primitives (button, dropdown, etc.)
    └── app/                    # Next.js App Router
        ├── layout.tsx          # Root layout, fonts, GTM, Toaster
        ├── globals.css         # All CSS variables + utilities
        ├── page.tsx            # Homepage composition
        ├── fonts/              # CirceRounded OTF files
        ├── components/         # All page components live here
        │   ├── nav.tsx
        │   ├── hero.tsx
        │   ├── how-it-works.tsx       (Chapters II-IV)
        │   ├── featured-sections.tsx  (Collection grid)
        │   ├── social-proof.tsx       (Animated numbers)
        │   ├── lifestyle-grid.tsx     (Manifesto - copper section)
        │   ├── testimonials.tsx       (Reviews)
        │   ├── faq.tsx
        │   ├── newsletter.tsx
        │   ├── footer.tsx
        │   ├── marquee-bar.tsx        (deprecated no-op)
        │   ├── best-selling.tsx       (deprecated no-op)
        │   ├── ProductDetails.tsx     (real-API product page, 1400 lines)
        │   ├── ProductPreview.tsx     (fallback product page, no API)
        │   ├── _fallbackCatalogue.ts  (shared demo data for preview mode)
        │   ├── Authentication.tsx     (OTP modal)
        │   ├── ProductCard.tsx
        │   ├── ProductList.tsx
        │   ├── carouselProduct.tsx
        │   ├── GtmPageTracker.tsx
        │   └── types.ts
        ├── aboutus/page.tsx     # /aboutus
        ├── account/page.tsx     # /account
        ├── auth/                # OTP flow pages
        ├── cart/page.tsx        # /cart  (checkout flow start)
        ├── orders/page.tsx      # /orders
        └── product/[productId]/page.tsx   # /product/:id (server component)
```

---

## 3. Design system

### Color palette (Atelier light theme)

All colors are defined as Tailwind utility classes in `tailwind.config.ts`.
Prefer these tokens — **never** use hex codes or amber/orange Tailwind defaults.

| Token | Hex | Use |
|---|---|---|
| `k-ivory` | `#F4ECD8` | Primary background |
| `k-paper` | `#FAF4E4` | Off-white surfaces (cards) |
| `k-cream` | `#EFE4CC` | Deeper cream (footer, alt sections) |
| `k-cream-50` | `#F7EFDB` | Mid cream (newsletter, alt sections) |
| `k-cream-100` | `#EAD9B8` | Sand cream (image placeholders) |
| `k-cream-200` | `#D9C39A` | Borders, dividers |
| `k-espresso` | `#1A0F08` | Primary dark text + primary surface |
| `k-coffee` | `#2A1810` | Hover state for espresso buttons |
| `k-walnut` | `#5C3A21` | Muted dark labels |
| `k-copper` | `#B5651D` | **Primary accent** — italics, eyebrows, CTAs |
| `k-copper-light` | `#C97D33` | Hover state for copper |
| `k-amber` | `#D9A03E` | Secondary accent |
| `k-oxblood` | `#5C1F1A` | Deep accent (manifesto glow) |
| `k-ink` | `#0E0805` | Primary text |
| `k-ink-muted` | `#6B5444` | Body copy |

> **Single dark section**: `/app/src/app/components/lifestyle-grid.tsx`
> (`bg-k-copper`) — used as the Manifesto section for visual punch. Everything
> else is light.

### Typography

```
--font-sans: CirceRounded (body, --font-circe)
--font-display: Playfair Display (headlines, --font-display)
```

**Display sizes** (all use `clamp()` for fluid responsiveness):

- Mega hero: `text-[clamp(2.5rem,9vw,8rem)]`
- Section headline: `text-[clamp(2rem,6vw,5rem)]`
- Section subhead: `text-[clamp(2rem,5vw,4rem)]`
- Card title: `text-2xl md:text-3xl`

**Type rules**:
- Headlines use `font-display` + `leading-[0.92..0.95]` + `tracking-tightest`
- Italics get `text-k-copper` for emphasis (consistent across all sections)
- Eyebrow labels: `text-[10px] tracking-[0.4em] uppercase text-k-copper`
- Body: `text-k-ink-muted leading-relaxed`

### Spacing & layout helpers

- `.container-koffee` — max-width 1400px, responsive horizontal padding
- `.section-padding` — `clamp(4rem, 8vw, 7rem)` vertical
- `.grain-overlay` — SVG noise mix-blend-overlay
- `.img-hover-zoom` — 1.06 scale on group-hover
- `.link-underline` — animated underline reveal
- `.btn-pill-primary` / `.btn-pill-gold` / `.btn-pill-outline` — pill CTAs

### Animations

Defined in `tailwind.config.ts` and `globals.css`:

- `animate-fade-in-up`, `animate-fade-in-down`, `animate-scale-in`
- `animate-marquee` (hero marquee bar)
- `animate-float`, `animate-shimmer`, `animate-reveal`
- Easing: `ease-out-expo`, `ease-out-quart`, `ease-in-out-quart`
- Mount-triggered transitions via `useState(false)` → `useEffect(true)`

### Editorial patterns (used across sections)

1. **Eyebrow with copper rule**: `— ` line + chapter label
2. **Roman numerals**: I, II, III… for chapters
3. **N°01 / N°02 plates**: italicized item numbers
4. **Italic copper emphasis**: every headline has 1 italic word in copper
5. **Asymmetric image frames**: copper-bordered offset rectangles around photos
6. **Pill CTAs**: dark espresso pills with rotating copper-circle arrow
7. **Vertical edge labels**: `writing-mode: vertical-rl` on desktop only
8. **Decorative ghost text**: huge italic words at low opacity in section corners

---

## 4. Page-by-page guide

### `/` Homepage (`src/app/page.tsx`)

Composition in order:
1. `Nav` — fixed transparent → ivory on scroll
2. `Hero` — split asymmetric: copy left, NOC product image right (Unsplash), stat tiles, marquee at bottom
3. `Chapters` (file: `how-it-works.tsx`) — Chapters II/III/IV alternating image+text rows
4. `FeaturedSections` — Collection grid (6 cards), uses `<Link>` for navigation
5. `NumbersBar` (file: `social-proof.tsx`) — animated count-up stats (12K+, 48H, 100%, 4.9★)
6. `Manifesto` (file: `lifestyle-grid.tsx`) — **only copper section** with big blockquote
7. `Testimonials` — tab list (left) + paper quote card (right)
8. `FAQ` — sticky header + accordion with rotating ± icon
9. `Newsletter` — bordered glass card with email input + chip selector
10. `Footer` — giant "Koffelo." wordmark + 4-column links

### `/product/[productId]` Product page (`src/app/product/[productId]/page.tsx`)

**Server component** that decides between two render paths:

```
if NEXT_PUBLIC_API_URL is empty:
   → ProductPreview (uses _fallbackCatalogue)
elif API call succeeds:
   → ProductDetails (full real component, 1400 lines, reviews, variants, etc.)
elif API errors AND productId matches fallback (1-6):
   → ProductPreview (graceful degradation)
else:
   → notFound()  (404)
```

This means: **the site never breaks** regardless of API state.

### `/cart` Cart page (`src/app/cart/page.tsx`)

- 3-step progress bar (Cart → Checkout → Payment)
- Cart items list with qty controls (`useUpdateCartItems`, `useRemoveCartItems`)
- Coupon code input
- Subtotal / shipping / discount / total
- Auth gate before checkout (triggers `Authentication` modal)
- **Loading state**: Atelier-styled spinner
- **Error/empty state**: Premium empty-bag page with "Discover the Collection" CTA

### `/aboutus` (`src/app/aboutus/page.tsx`)

- Atelier-themed hero header (matched to homepage)
- Privacy Policy / Shipping / Payment / Returns / Refunds / Terms accordions
- Contact info, IP/copyright notice
- `id="terms"` anchor for footer link

### `/account`, `/orders`, `/auth/*`

Existing pre-redesign pages — functional, talk to the API for user profile,
order history, and OTP login. Not heavily restyled (preserved as-is).

---

## 5. API integration

### Base URL

`src/utils/axiosInstance.ts` reads `process.env.NEXT_PUBLIC_API_URL`:

```ts
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

Set in `/app/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.koffelo.com   # example
```

**After editing `.env.local`, restart frontend**:

```bash
sudo supervisorctl restart frontend
```

### Endpoints (`src/endpoint.ts`)

Single source of truth — matches the Koffelo backend repo routes exactly:

| Constant | Path | Method | Purpose |
|---|---|---|---|
| `SEND_OTP` | `/api/auth/sendOrResend-otp` | POST | Trigger OTP |
| `VERIFY_OTP` | `/api/auth/verify-otp` | POST | Verify + receive JWT |
| `LOGOUT` | `/api/auth/logout` | POST | Clear server session |
| `GET_PRODUCT_INFO` | `/api/products` | GET | List all products + variants |
| `ADD_TO_CART` | `/api/cart` | POST/PUT/DELETE | Cart CRUD |
| `MERGE_CART` | `/api/cart/merge` | POST | Merge guest → user cart |
| `CREATE_ADDRESS` | `/api/addresses` | POST | Create |
| `GET_ADDRESS` | `/api/addresses` | GET | List |
| `UPDATE_ADDRESS` | `/api/addresses` | PUT | Update |
| `CREATE_ORDER` | `/api/orders` | POST | Place order |
| `GET_ORDER_BY_ID` | `/api/orders` | GET | Order details |
| `CREATE_PAYMENT_ORDER` | `/api/payments/paymentOrder` | POST | Razorpay order |
| `CHECK_ORDER_STATUS` | `/api/payments/checkOrderStatus` | POST | Verify payment |
| `ADD_REVIEW` | `/api/products` | POST `/:id/reviews` | Submit review |
| `GET_REVIEWS` | `/api/products` | GET `/:id/reviews?page=&limit=` | List reviews |
| `UPLOAD_IMAGE` | `/api/storage/upload` | POST | Image upload (multipart) |
| `FETCH_PINCODE` | `/api/pincode` | GET | Pincode serviceability |

### Auth flow

1. `axiosInstance` request interceptor adds `Authorization: Bearer <token>`
   from cookie, OR `Session-Id: <sessionId>` if no token (guest session).
2. Response interceptor: on 401 → clears cookies + opens auth modal via
   Zustand store (`useAuthModalStore.setOpen(true)`).
3. After successful OTP verify, backend returns JWT → stored in cookie via
   `cookieHelper.set("token", ...)`.

### Preview / fallback mode

When `NEXT_PUBLIC_API_URL` is empty or the API fails:

- **Collection grid** → renders 6 products from `_fallbackCatalogue.ts`
- **Product page** → renders `ProductPreview` component
- **Cart** → renders empty-bag premium state
- **GTM/analytics** wrapped in try/catch so they never crash the UI

This means the site is **always functional** for demos and development.

---

## 6. Environment & runtime

### Local development

```bash
cd /app
yarn install
yarn dev   # next dev -p 3000 -H 0.0.0.0
```

Frontend runs on port 3000.

### Container (supervisor)

The Kubernetes preview environment runs the frontend via supervisor.

- Config: `/etc/supervisor/conf.d/supervisord.conf` (readonly, lives outside `/app`)
- The `program:frontend` block expects `/app/frontend` → I symlinked
  `/app/frontend` → `/app` so the readonly config works against this single-app layout
- `package.json` script `start` is set to `next dev -p 3000 -H 0.0.0.0` so
  supervisor's `yarn start` actually runs dev mode (correct for the preview env)

Restart:
```bash
sudo supervisorctl restart frontend
tail -n 50 /var/log/supervisor/frontend.out.log
```

### Environment variables

All in `/app/.env.local` (gitignored):

| Variable | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | For real data | Backend base URL |

Optional (not currently used but supported by code):
- `NEXT_PUBLIC_RAZORPAY_KEY` (if you front-end Razorpay)
- `NEXT_PUBLIC_GTM_ID` (currently hardcoded `GTM-TMRTQV4H` in layout.tsx)

### Hot reload

- Component edits auto-reload
- `.env.local` changes require a frontend restart
- `tailwind.config.ts` changes are picked up by Tailwind JIT but a refresh
  may be needed

---

## 7. Common tasks

### Add a new homepage section

1. Create the component in `src/app/components/` following the editorial
   pattern: eyebrow + copper rule, big serif headline with one italic copper
   word, body in `text-k-ink-muted`
2. Import it in `src/app/page.tsx` and add it in the composition order
3. Wrap content in `<div className="container-koffee">` and pad with
   `section-padding`
4. Always make it mobile-responsive: stack `lg:grid-cols-12` on mobile,
   `clamp()` font sizes, `hidden md:block` for desktop-only decorations
5. Use `data-testid` on interactive elements for QA

### Add a new product (in fallback mode)

Edit `src/app/components/_fallbackCatalogue.ts` — add an object with the
same shape (id, name, description, price, discountedPrice, img, tag, notes,
origin, roast). The id is the URL slug. Image URLs should be Unsplash
`?w=1200&q=85&auto=format&fit=crop`.

### Change brand colors

Edit `tailwind.config.ts` under `theme.extend.colors`. The `k-*` tokens are
consumed everywhere — change them and the entire site re-themes.

### Wire up a new API endpoint

1. Add the path constant to `src/endpoint.ts`
2. Use `axiosInstance` to call it (auth headers attach automatically)
3. Wrap in `useQuery` or `useMutation` if it's a hook pattern
4. Handle the error case gracefully (don't surface raw API errors)

### Make a section responsive

Standard breakpoints:
- Mobile: default
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px

Patterns:
- `text-[clamp(min,vw,max)]` for fluid type
- `hidden md:block` to hide decorations on mobile
- `grid-cols-1 lg:grid-cols-12` to stack
- `gap-6 md:gap-12 lg:gap-16` for breathing room
- `min-h-[44px]` on touch targets

---

## 8. Critical conventions

1. **Never use hex codes** in components — always Tailwind tokens
2. **Never use amber/orange/yellow Tailwind defaults** — use `k-copper`, `k-amber`, `k-cream`
3. **Always wrap interactive cards in `<Link>`** (not onClick) for navigation —
   prevents the "click does nothing during hydration" bug
4. **All API access through `axiosInstance`** — never instantiate raw `axios()`
5. **All paths through `ENDPOINT.*` constants** — no hardcoded URLs
6. **Italic copper rule**: every section headline has exactly one italic word
   in `text-k-copper`. Maintains brand cohesion.
7. **Mobile-first responsiveness**: write the mobile layout first, then add
   `md:` / `lg:` overrides. Vertical labels, ghost text, hover effects all
   guarded by `hidden md:block`.
8. **Touch targets ≥ 44px** on mobile (use `min-h-[44px]`)
9. **Data-testid on every interactive/critical element** (used for QA tests)
10. **Server components** for product detail page (`product/[productId]/page.tsx`)
    — runs the API call server-side for SEO. Client components elsewhere.

---

## 9. Known states & graceful degradation

| Condition | Behavior |
|---|---|
| `NEXT_PUBLIC_API_URL` empty | Preview/fallback mode everywhere |
| API returns 401 | Auth modal opens automatically |
| API returns 404 on product | `notFound()` → 404 page |
| API errors on cart load | Empty-bag premium state |
| API errors on homepage products | Fallback catalogue renders |
| User not logged in trying to checkout | Auth modal opens |
| Image fails to load | Default `bg-k-cream-100` placeholder visible |

---

## 10. Things deliberately kept simple

- **No client-side product search** (small catalogue, not needed)
- **No wishlist** (over-engineering for the brand voice)
- **No multi-currency** (INR-only)
- **No internationalization** (English-only, India market)
- **No service worker / PWA** (not requested)
- **Image optimization**: using `<img>` (not `next/image`) for simplicity and
  to avoid `next.config.mjs` allowlist requirements when using Unsplash URLs
  in preview mode. Swap to `next/image` once switched to your own CDN.

---

## 11. Quick start for a new contributor

```bash
# 1. Clone & install
cd /app
yarn install

# 2. Set the API URL (or leave empty for preview mode)
echo "NEXT_PUBLIC_API_URL=https://api.koffelo.com" > .env.local

# 3. Run dev
yarn dev   # http://localhost:3000

# 4. Visit
#    http://localhost:3000/              homepage
#    http://localhost:3000/product/1     product preview (signature)
#    http://localhost:3000/cart          cart
#    http://localhost:3000/aboutus       about
```

To explore the design tokens visually, every section in `src/app/page.tsx`
demonstrates the patterns: open any component, copy the eyebrow + headline +
body pattern, and you have a new section ready to drop in.

---

## 12. Where to look first when something breaks

| Symptom | First file to check |
|---|---|
| Click on product card does nothing | `src/app/components/featured-sections.tsx` (must use `<Link>`) |
| Products not loading | `.env.local` `NEXT_PUBLIC_API_URL` value |
| Cart stuck loading | `src/app/cart/page.tsx` loading/error blocks |
| Headlines look wrong | `tailwind.config.ts` font tokens + `layout.tsx` font imports |
| Colors look wrong | `tailwind.config.ts` `k-*` tokens (NOT `globals.css`) |
| Layout broken on mobile | Check `hidden md:block`, missing `grid-cols-1`, font `clamp()` ranges |
| 401 loop | Cookie missing/expired → `cookieHelper.ts` + auth modal flow |
| Tailwind classes not applied | `content` paths in `tailwind.config.ts` |
| Hydration warnings | Server/client component mismatch — check `"use client"` directive |

---

## 13. Recent change log (high-level)

- **Feb 2026** — Total redesign to "Atelier Koffelo" light theme, 9 editorial
  sections, Roman numeral chapter system, copper accents, preview-mode
  fallback so site works without an API, mobile-first responsiveness across
  all sections, footer overlap fix, view-product navigation via `<Link>`,
  cart graceful empty state, aboutus header Atelier match.

---

**End of doc.** If you need anything beyond this, the code is small, well-
commented, and uses consistent patterns — read one component and you've seen
them all.
