import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export const PrivateRoute = () => {
    const { checkAuth } = useContext(AuthContext);
    
    return checkAuth() ? <Outlet /> : <Navigate to="/login" />;
}