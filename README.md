# NOVAIRE — Curated Luxury E-Commerce

A high-end fashion e-commerce storefront built with the modern Next.js App Router stack. Features a full product catalog, cart, wishlist, multi-currency support, and a polished dark luxury aesthetic.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| UI Primitives | shadcn/ui + Base UI |
| State | React Context (Cart, Wishlist, Auth, Currency, Search) |

## Features

- **Shop** — Full catalog with 60+ products across 6 categories, search, sort, and sidebar navigation
- **Product Modal** — Quick-view overlay with size selection, add-to-cart, and wishlist toggle
- **Cart Drawer** — Slide-out cart with quantity controls and order summary
- **Wishlist** — Persistent wishlist page with empty state
- **Multi-currency** — Currency switcher in the navbar
- **Auth flows** — Login, register, forgot password pages
- **Lazy loading** — All off-screen product images load lazily; broken images show a graceful fallback
- **Skeleton loading** — Product card skeletons shown during initial shop page load

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/              # Next.js App Router pages
components/
  Landing/        # Homepage sections (Hero, Collections, Products, etc.)
  Layout/         # Navbar, Footer, SecondaryNav, Container
  ui/             # Shared UI components (Cart, Modal, Skeletons, etc.)
context/          # React Context providers
data/             # Product catalog data
hooks/            # Custom hooks
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/shop` | Full catalog with filters |
| `/shop/[category]` | Category-specific pages |
| `/wishlist` | Saved items |
| `/checkout` | Checkout flow |
| `/account` | Account dashboard |
| `/login` · `/register` | Auth pages |
| `/contact` · `/about` | Info pages |
