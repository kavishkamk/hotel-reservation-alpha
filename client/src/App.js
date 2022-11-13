import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

// pages
import BookingPage from "./pages/BookingPage"
import HomePage from "./pages/HomePage"

// containers
import ReservationType from "./containers/booking-progress/ReservationType"
import CheckinCheckout from "./containers/booking-progress/CheckinCheckout"

// components
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

function App() {
  return (
		<>
		<Navbar />
		<Router>
			<Routes>
				<Route exact path="/" element={<HomePage />} />
				<Route path="/booking-process" element={<BookingPage />} />
			</Routes>
		</Router>
		<Footer />
		</>
	);
}

export default App;
