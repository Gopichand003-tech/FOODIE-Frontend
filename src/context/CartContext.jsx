import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { hasOrders } from "../services/orderService";
import { checkCoupon, computeBill } from "../utils/pricing";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const toast = useToast();

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  function addItems(list, qtyEach = null) {
    setItems((current) => {
      let next = [...current];
      for (const dish of list) {
        const qty = qtyEach ?? dish.qty ?? 1;
        const existing = next.find((item) => item.id === dish.id);
        if (existing) {
          next = next.map((item) =>
            item.id === dish.id ? { ...item, qty: item.qty + qty } : item
          );
        } else {
          next.push({ ...dish, qty });
        }
      }
      return next;
    });
  }

  function addItem(dish) {
    addItems([dish], 1);
    toast.show(`${dish.name} added to cart`);
  }

  function changeQty(id, delta) {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  }

  function clear() {
    setItems([]);
    setCouponCode("");
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  // re-check the coupon on every change, so it drops out if the cart no longer qualifies
  const isFirstOrder = user ? !hasOrders(user.id) : false;
  const couponStatus = couponCode ? checkCoupon(couponCode, subtotal, isFirstOrder) : null;
  const activeCoupon = couponStatus?.ok ? couponStatus.coupon : null;
  const bill = computeBill(subtotal, activeCoupon);

  function applyCoupon(code) {
    const result = checkCoupon(code, subtotal, isFirstOrder);
    if (result.ok) setCouponCode(result.coupon.code);
    return result;
  }

  function removeCoupon() {
    setCouponCode("");
  }

  return (
    <CartContext.Provider
      value={{
        items,
        open,
        setOpen,
        addItem,
        addItems,
        changeQty,
        clear,
        count,
        subtotal,
        bill,
        total: bill.total,
        couponCode,
        couponStatus,
        activeCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
