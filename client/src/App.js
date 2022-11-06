import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

// containers
import ReservationType from "./containers/booking-progress/ReservationType"
import CheckinCheckout from "./containers/booking-progress/CheckinCheckout"

// testing components
import CardContainer from "./components/cards/CardContainer"

// pages
import BookingPage from "./pages/BookingPage"

function App() {
  return (
		// <Router>
		// 	<Routes>
		// 		<Route exact path="/" element={<ReservationType />} />

		// 	</Routes>
		// </Router>

		<div className="app">
			{/* <CheckinCheckout /> */}
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
