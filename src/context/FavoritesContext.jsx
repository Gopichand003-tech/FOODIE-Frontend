import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

const keyFor = (userId) => `foodie_favorites_${userId}`;

function readFavorites(userId) {
  try {
    return JSON.parse(localStorage.getItem(keyFor(userId))) || [];
  } catch {
    return [];
  }
}

function FavoritesInner({ userId, children }) {
  const [ids, setIds] = useState(() => readFavorites(userId));

  function toggle(dishId) {
    setIds((current) => {
      const next = current.includes(dishId)
        ? current.filter((id) => id !== dishId)
        : [...current, dishId];
      localStorage.setItem(keyFor(userId), JSON.stringify(next));
      return next;
    });
  }

  const isFavorite = (dishId) => ids.includes(dishId);

  return (
    <FavoritesContext.Provider value={{ ids, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// keyed by user so favorites reload when someone logs in or out
export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  return (
    <FavoritesInner key={user?.id ?? "guest"} userId={user?.id ?? "guest"}>
      {children}
    </FavoritesInner>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
