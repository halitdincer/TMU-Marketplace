import React, { createContext, useState } from "react";

// Context for authentication-related data, preventing prop-drilling
export const AuthContext = createContext();

// Component responsible for managing authentication state and providing authentication-related functions to its children
export const AuthProvider = ({ children }) => {

  const [apiToken, setApiToken] = useState(localStorage.getItem("apiToken"));
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  // Function to handle login
  async function login(username, password) {
    try {
      // Fetch API for login with username and password
      const response = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if response is OK, indicating login happened succesfully
      if (!response.ok) throw new Error("Login failed");
      
      // Retrieve the data from the response to update the state and local storage item
      const responseData = await response.json();
      const token = responseData.Authorization.split(" ")[1];
      const user = responseData.user;

      localStorage.setItem("apiToken", token);
      localStorage.setItem("userData", JSON.stringify(user));

      setApiToken(token);
      setUserData(user);

    } catch (error) {
      console.error("Login error:", error);
    }
  }

  // Function to handle logout
  async function logout() {
    try {
      // Check if apiToken already exist
      if (!apiToken) throw new Error("No API token found");

      // Fetch API for logout with the token
      const response = await fetch("http://127.0.0.1:8000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${apiToken}`,
        },
      });
      
      // Check if response is OK, indicating logout happened succesfully
      if (!response.ok  && response.status !== 401  && response.status !== 403) throw new Error("Logout failed");
      
      // Remove the token and user data from local storage 
      localStorage.removeItem("apiToken");
      localStorage.removeItem("userData");

      // Null the token and user data state
      setApiToken(null);
      setUserData(null);

    } catch (error) {
      // Output the error code
      console.error("Logout error:", error);
    }
  }

  // Function to update user profile
  async function updateProfile(updatedUserData) {
    try {
      // Check if apiToken already exist
      if (!apiToken) throw new Error("No API token found");

      // Fetch API for updating user profile with the token and updated user data
      const response = await fetch("http://127.0.0.1:8000/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${apiToken}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      // Check if response is OK, indicating update happened successfully
      if (!response.ok) throw new Error("Update failed");

      // Retrieve the data from the response to update the state and local storage item
      const responseData = await response.json();
      const user = responseData.user;

      localStorage.setItem("userData", JSON.stringify(user));
      setUserData(user);

    } catch (error) {
      console.error("Update error:", error);
    }
  }

  // Function to check if user logged in
  function checkAuth() {
    // Check if the apiToken is present to determine authentication status
    return apiToken !== null;
  }

  // Function to retrive API token
  function getToken(){
    return apiToken;
  }

  // Providing the authentication context value to the children components
  return (
    <AuthContext.Provider value={{ apiToken, userData, login, logout, checkAuth, getToken, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
