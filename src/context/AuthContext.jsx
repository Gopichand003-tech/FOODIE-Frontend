
import { createContext, useContext, useState } from "react";
import * as auth from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => auth.getCurrentUser());

  async function signup(data) {
    const newUser = await auth.signup(data);
    setUser(newUser);
    return newUser;
  }

  async function login(data) {
    const loggedInUser = await auth.login(data);
    setUser(loggedInUser);
    return loggedInUser;
  }

  function logout() {
    auth.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
