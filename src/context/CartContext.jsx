
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  function addItem(dish) {
    const existingItem = items.find(
      item => item.id === dish.id
    );

    if (existingItem) {
      setItems(items.map(item =>
        item.id === dish.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setItems([...items, { ...dish, qty: 1 }]);
    }

    setOpen(true);
  }

  function changeQty(id, delta) {
    const updatedItems = items
      .map(item =>
        item.id === id
          ? { ...item, qty: item.qty + delta }
          : item
      )
      .filter(item => item.qty > 0);

    setItems(updatedItems);
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const count = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        open,
        setOpen,
        addItem,
        changeQty,
        clear,
        total,
        count
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return cart;
}
