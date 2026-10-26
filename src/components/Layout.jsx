import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import Cart from "./Cart";

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
