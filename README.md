# Gratis Fine Dine Bar — Premium Restaurant Website

A mobile-first React/Vite website for Gratis Fine Dine Bar, Baner, Pune.

## Stack
- React 19 + Vite
- Tailwind CSS 4 via `@tailwindcss/vite`
- Framer Motion
- React Router
- Lucide React
- Firebase Authentication
- Express + Nodemailer for optional branded 6-digit email verification

## 1. Frontend setup

From the project root:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## 2. Firebase

Copy `.env.example` to `.env` and add your Firebase Web App values.
Enable these providers in Firebase Authentication:
- Google
- Email/Password

For local development, make sure `localhost` is an authorized domain in Firebase Authentication.

## 3. Branded 6-digit verification

The optional backend sends verification emails branded as Gratis Fine Dine Bar.

Open a second terminal:

```bash
cd server
npm install
npm run server
```

The API runs at `http://localhost:8787` by default.

Create `server/.env` from `server/.env.example` and configure SMTP. Example for Gmail:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=yourrestaurantemail@gmail.com
SMTP_PASS=your-google-app-password
MAIL_FROM="Gratis Fine Dine Bar <yourrestaurantemail@gmail.com>"
PORT=8787
CLIENT_ORIGIN=http://localhost:5173
```

Then keep this in the root `.env`:

```env
VITE_AUTH_API_URL=http://localhost:8787
```

## 4. Production build

```bash
npm run build
npm run preview
```

## Pages
- `/` Home
- `/menu` Menu with Food/Beverages and Veg/Non-Veg tabs
- `/about` About Us and detailed service/amenity information
- `/visit` Map, contact, parking, services and FAQ

## Restaurant links
- Instagram: https://www.instagram.com/gratispune/
- Zomato: https://www.zomato.com/pune/gratis-fine-dine-restaurant-baner
- Swiggy Dineout: https://www.swiggy.com/restaurants/pune/baner/gratis-fine-dine-bar-1158808/dineout

## Notes
- Menu prices are included from the supplied restaurant menu data. Seafood entries marked APC retain that printed notation.
- Restaurant photography is bundled locally under `public/assets/photos/` and comes from the supplied Normal Images and Popular image PDFs.
- No awards, chef names, founding year or fabricated drink names are added.
