import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  // ⏰ 24 hours in ms
  const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

  // Load saved auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const expiry = localStorage.getItem("token_expiry");

    if (token && user && expiry) {
      const now = Date.now();
      if (now < parseInt(expiry, 10)) {
        // still valid
        setAuth({ token, user: JSON.parse(user) });
      } else {
        // expired → cleanup
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("token_expiry");
      }
    }
  }, []);

  // Save auth on change
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem("token_expiry", Date.now() + TOKEN_EXPIRY);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token_expiry");
    }
  }, [auth]);

  // Auto logout when token expires
  useEffect(() => {
    if (!auth.token) return;

    const expiry = localStorage.getItem("token_expiry");
    if (!expiry) return;

    const timeout = setTimeout(() => {
      setAuth({ token: null, user: null }); // clear state
    }, parseInt(expiry, 10) - Date.now());

    return () => clearTimeout(timeout);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
