import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

// pages
import BookingPage from "./pages/BookingPage"

// containers
import ReservationType from "./containers/booking-progress/ReservationType"
import CheckinCheckout from "./containers/booking-progress/CheckinCheckout"

// testing components
import CardContainer from "./components/cards/CardContainer"
import Dropdown from "./components/booking-progress/Dropdown"

function App() {
  return (
		<Router>
			<Routes>
				<Route exact path="/" element={<BookingPage />} />
				{/* <Route path="/booking-summary" element={} /> */}
			</Routes>
		</Router>
	);
}

export default App;
