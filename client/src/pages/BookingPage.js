import React, {useState} from 'react'

// components
import ProgressTracker from "../components/booking-progress/ProgressTracker"

// containers
import CheckinCheckout from "../containers/booking-progress/CheckinCheckout"
import ReservationType from "../containers/booking-progress/ReservationType"

// icons
import {ReactComponent as CircleMark} from "../assets/booking-progress/circle-mark.svg"
import {ReactComponent as LineMark} from "../assets/booking-progress/line-mark.svg"

const BookingPage = () => {
	const [page, setPage] = useState(0)
	const [formData, setFormData] = useState({
		type: "",
		checkin: "",
		checkout: "",
		guests: "",

	})

	const containerList = [
		<ReservationType
			page={page}
			setPage={setPage}
			formData={formData}
			setFormData={setFormData}
		/>,
		<CheckinCheckout
			page={page}
			setPage={setPage}
			formData={formData}
			setFormData={setFormData}
		/>, 
	];
	return (
		<div className="">
			<ProgressTracker page={page} />

			<div className="">
				{containerList[page]}
			</div>
		</div>
	)
}

export default BookingPage