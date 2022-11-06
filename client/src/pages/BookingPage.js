import React from 'react'

// components
import ProgressTracker from "../components/booking-progress/ProgressTracker"

// containers
import CheckinCheckout from "../containers/booking-progress/CheckinCheckout"
import ReservationType from "../containers/booking-progress/ReservationType"

// icons
import {ReactComponent as CircleMark} from "../assets/booking-progress/circle-mark.svg"
import {ReactComponent as LineMark} from "../assets/booking-progress/line-mark.svg"

const BookingPage = () => {
	return (
		<div className="">
			<ProgressTracker />
		</div>
	)
}

export default BookingPage