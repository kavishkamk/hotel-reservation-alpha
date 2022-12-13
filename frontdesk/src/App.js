import './App.css';
import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {DefaultContext} from "./context/DefaultContext"

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import CheckinPage from "./pages/CheckinPage"
import CheckoutPage from "./pages/CheckoutPage"
import BookingPage from "./pages/BookingPage"
import NotFoundPage from "./pages/NotFoundPage"
import PrintPage from "./pages/PrintPage"

function App() {
	const {path} = useContext(DefaultContext)

  return (
		<>
			<Navbar currentPath={path} />

			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route
					path="/checkin"
					element={<CheckinPage />}
				/>
				<Route
					path="/checkout"
					element={<CheckoutPage />}
				/>
				<Route
					path="/booking"
					element={<BookingPage />}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/print" element={<PrintPage />} />
				
				{/* 404 not found */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<Footer />
		</>
	);
}

export default App;
