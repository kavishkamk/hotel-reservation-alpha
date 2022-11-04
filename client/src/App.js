import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

// pages
import ReservationType from "./containers/booking-progress/ReservationType"
import CheckinCheckout from "./containers/booking-progress/CheckinCheckout"

function App() {
  return (
		<Router>
			<Routes>
				<Route exact path="/" element={<ReservationType />} />
				
			</Routes>
		</Router>
	);
}

export default App;
