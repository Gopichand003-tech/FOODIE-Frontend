# FOODIE — Frontend

A simple food ordering app built with **React + Vite + React Bootstrap**.
It runs fully in the browser (data is saved in localStorage) — no backend needed.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Pages

- `/login`, `/signup` – account (all other pages need login)
- `/` – home
- `/menu` – full menu with search, category / veg filters, sorting, add to cart
- `/favorites` – dishes you've hearted
- `/track` – live order status (pending → confirmed → cooking → out for delivery → delivered)
- `/history` – delivered orders, with a Reorder button

## Coupons

`FIRST50` (50% off first order, max ₹150), `SAVE100` (₹100 off above ₹500), `FREEDEL` (free delivery).
Delivery is ₹40 (free above ₹399) and GST is 5%. Rules live in `src/utils/pricing.js`.

## Folder structure

```
src/
  App.jsx          routes
  components/      Layout, AppNavbar, Footer, Cart, DishCard, AuthLayout, ProtectedRoute
  context/         AuthContext, CartContext, FavoritesContext, ToastContext
  data/menu.js     menu items
  pages/           Home, Menu, Favorites, Login, Signup, Track, History
  utils/pricing.js coupons + bill calculation
  services/        localStorage auth + orders
```
