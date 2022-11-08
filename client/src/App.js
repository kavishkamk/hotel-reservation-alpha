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
		// <Dropdown />

		// <Router>
		// 	<Routes>
		// 		<Route exact path="/" element={<ReservationType />} />

		// 	</Routes>
		// </Router>

		<div className="app">
			<BookingPage />
		</div>


		// <div className="flex flex-wrap">
		// 	<CardContainer />
		// 	<CardContainer />
		// 	<CardContainer />
		// 	<CardContainer />
		// 	<CardContainer />
		// 	<CardContainer />
		// </div>
	);
}

export default App;
