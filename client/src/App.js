import './App.css';
import {
	Route,
	Routes
} from "react-router-dom";

// pages
import BookingPage from "./pages/BookingPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import RoomsPage from "./pages/RoomsPage"
import RestaurentsPage from "./pages/RestaurentsPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import NotFoundPage from "./pages/NotFoundPage"

// components
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

function App() {
  return (
		<>
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

				{/* not found */}
				<Route path="*" element={<NotFoundPage />} />

			</Routes>
			<Footer />
		</>
	);
}

export default App;
