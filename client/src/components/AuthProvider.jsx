import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State now only holds the apiToken
  const [apiToken, setApiToken] = useState(localStorage.getItem("apiToken"));

  const login = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error("Login failed");
      const { token } = await response.json();
      setApiToken(token);
      localStorage.setItem("apiToken", token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    // Clear the apiToken upon logout
    setApiToken(null);
  };

  const checkAuth = () => {
    // Check if the apiToken is present to determine authentication status
    return apiToken !== null;
  };

  // Optionally, you can still provide a method to get the current token
  const getToken = () => {
    return apiToken;
  };

  return (
    <AuthContext.Provider value={{ apiToken, login, logout, checkAuth, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
