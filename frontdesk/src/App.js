import './App.css';
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import CheckinPage from "./pages/CheckinPage"
import CheckoutPage from "./pages/CheckoutPage"
import BookingPage from "./pages/BookingPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
		<>
			<Navbar />

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

				{/* 404 not found */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<Footer />
		</>
	);
}

export default App;
