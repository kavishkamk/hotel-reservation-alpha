import "./App.css";
import React, {
	useContext,
	useState,
	useEffect,
} from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultContext } from "./context/DefaultContext";
import { ProtectedRoute } from "./ProtectedRoute";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CheckinPage from "./pages/CheckinPage";
import CheckoutPage from "./pages/CheckoutPage";
import BookingPage from "./pages/BookingPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrintPage from "./pages/PrintPage";

function App() {
	const { path } = useContext(DefaultContext);

	return (
		<>
			{path !== "/print" && <Navbar currentPath={path} />}

			<Routes>
				<Route
					exact
					path="/"
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/checkin"
					element={
						<ProtectedRoute>
							<CheckinPage />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/checkout"
					element={
						<ProtectedRoute>
							<CheckoutPage />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/booking"
					element={
						<ProtectedRoute>
							<BookingPage />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/login"
					element={
						<ProtectedRoute>
							<LoginPage />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/print"
					element={
						<ProtectedRoute>
							<PrintPage />
						</ProtectedRoute>
					}
				/>

				{/* 404 not found */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			{path !== "/print" && <Footer />}
		</>
	);
}

export default App;
