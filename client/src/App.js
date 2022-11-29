import "./App.css";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultContext } from "./context/DefaultContext";

// pages
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoomsPage from "./pages/RoomsPage";
import RestaurentsPage from "./pages/RestaurentsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

// components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import PopupContainer from "./components/popup/PopupContainer";

function App() {
	const {
		detailPopup,
		details,
		setDetailPopup_func,
		details_title,
		details_rate,
		details_images,
	} = useContext(DefaultContext);

	const blurbgClick = () => {
		setDetailPopup_func(!detailPopup);
	};

	return (
		<>
			{/* blurred background when a detailPopup is showing */}
			{detailPopup && (
				<div
					onClick={blurbgClick}
					className="w-screen fixed top-0 bottom-0 backdrop-blur-sm z-50"
				></div>
			)}

			{detailPopup && (
				<PopupContainer
					details={details}
					title={details_title}
					rate={details_rate}
					images={details_images}
				/>
			)}

			<Navbar />

			<Routes>
				<Route exact path="/" element={<HomePage />} />
				<Route
					path="/booking-process"
					element={<BookingPage />}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
				<Route path="/rooms" element={<RoomsPage />} />
				<Route
					path="/restaurents"
					element={<RestaurentsPage />}
				/>
				<Route path="/about-us" element={<AboutPage />} />
				<Route
					path="/contact-us"
					element={<ContactPage />}
				/>

				{/* 404 not found */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
