import { createContext, useContext, useState } from "react";
import { auth } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(auth.isAuthenticated());

  function login(token) {
    auth.login(token);
    setIsAuth(true);
  }

  function logout() {
    auth.logout();
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}