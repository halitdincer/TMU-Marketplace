import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => {
    // Perform the login logic
    setIsAuthenticated(true);
  };
  const logout = () => {
    // Perform the logout logic
    setIsAuthenticated(false);
  };
  const checkAuth = () => {
    // Check if the user is authenticated
    return isAuthenticated;
  };
  return (
    <AuthContext.Provider value={{ login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};