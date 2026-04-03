# 💍 Heart of Gold Jewels — Next.js Website

A full-featured, modern jewelry vendor website built with **Next.js 14** and **Tailwind CSS**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
heart-of-gold-jewels/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & custom CSS
│   ├── products/page.tsx     # Products/Collections page
│   ├── services/page.tsx     # Services page
│   ├── order/page.tsx        # Order form page
│   └── admin/page.tsx        # Admin dashboard
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── Footer.tsx            # Footer
│   ├── Hero.tsx              # Hero section (auto-slides)
│   ├── FeaturedProducts.tsx  # Products grid with filter
│   ├── InfoSwiper.tsx        # Auto-swiping testimonials
│   └── ServicesSection.tsx   # Services cards
├── lib/
│   └── products.ts           # Product data
└── public/                   # Static assets
```

---

## 🌐 Pages

| Route | Page |
|-------|------|
| `/` | Homepage with Hero, Products, Info Swiper, Services |
| `/products` | Full product catalog with search & filter |
| `/services` | Services overview with process & guarantees |
| `/order` | Customer order form |
| `/admin` | Admin dashboard (analytics, orders, products) |

---

## 🎨 Design System

- **Primary Color**: Purple (`#7e22ce` — `purple-700`)
- **Accent Color**: Gold (`#d97706` — `amber-600`)
- **Background**: White (`#ffffff`)
- **Fonts**: Playfair Display (headings) + Cormorant Garamond (body) + DM Sans (UI)

### Button Classes
```css
.btn-gold        /* Gold gradient button */
.btn-purple      /* Purple gradient button */
.btn-outline-gold /* Gold outlined button */
```

---

## 🛠 Admin Dashboard

Access at `/admin`. Features include:
- **Dashboard** — Analytics cards, order breakdown charts, recent orders
- **Orders** — View, filter, and update order status (Pending → Processing → Delivered)
- **Products** — Manage catalog, delete items
- **Add New Arrival** — Form to add new products with badge, category, colors, etc.

> ⚠️ The admin currently uses mock/in-memory data. Connect to a database (e.g. Supabase, MongoDB) to make it persistent.

---

## 📦 Adding Functionality

To add real backend functionality:

1. **Orders**: Create an API route at `app/api/orders/route.ts` and connect to a database
2. **Auth for Admin**: Add NextAuth.js or Clerk for admin login protection
3. **Image Upload**: Integrate Cloudinary or Supabase Storage for product images
4. **WhatsApp Integration**: Add `wa.me` links with pre-filled order messages

---

## 📱 Responsive

Fully responsive across mobile, tablet and desktop.

---

Built with ❤️ for Heart of Gold Jewels, Port Harcourt.
