import React from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "./functions/Auth";


export const ProtectedRoute = ({children})=> {
	const authStatus = auth.isAuthenticated();
	// const authStatus = false

	return authStatus ? children : <Navigate to="/login" />;

}