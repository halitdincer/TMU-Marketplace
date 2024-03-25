import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export const PrivateRoute = () => {
    const { checkAuth } = useContext(AuthContext);
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return checkAuth() ? <Outlet /> : <Navigate to="/login" />;
}