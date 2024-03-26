import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function GuestRoute(){
    const { checkAuth } = useContext(AuthContext);
    
    return checkAuth() ?  <Navigate to="/" /> : <Outlet /> ;
}