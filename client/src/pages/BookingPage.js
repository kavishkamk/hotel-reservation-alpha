import React, { useState } from "react";

// components
import ProgressTracker from "../components/booking-progress/ProgressTracker";

// containers
import CheckinCheckout from "../containers/booking-progress/CheckinCheckout";
import ReservationType from "../containers/booking-progress/ReservationType";
import ItemsFilter from "../containers/booking-progress/ItemsFilter";

const BookingPage = () => {
	const [page, setPage] = useState(0);
	const [formData, setFormData] = useState({
		type: "",
		checkin: "",
		checkout: "",
		guests: "",
	});

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
		<ItemsFilter
			page={page}
			setPage={setPage}
			formData={formData}
			setFormData={setFormData}
		/>,
	];
	
	return (
		<div className="">
			<ProgressTracker page={page} />

			<div className="">{containerList[page]}</div>
		</div>
	);
};

export default BookingPage;
