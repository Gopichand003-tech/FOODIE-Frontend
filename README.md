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
- `/menu` – full menu, add to cart
- `/track` – live order status (pending → confirmed → cooking → out for delivery → delivered)
- `/history` – delivered orders

## Folder structure

```
src/
  App.jsx          routes
  components/      Layout, AppNavbar, Footer, Cart, DishCard, AuthLayout, ProtectedRoute
  context/         AuthContext, CartContext
  data/menu.js     menu items
  pages/           Home, Menu, Login, Signup, Track, History
  services/        localStorage auth + orders
```
