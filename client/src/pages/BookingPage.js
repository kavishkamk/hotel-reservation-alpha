import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// components
import ProgressTracker from "../components/booking-progress/ProgressTracker";

// containers
import CheckinCheckout from "../containers/booking-progress/CheckinCheckout";
import ReservationType from "../containers/booking-progress/ReservationType";
import ItemsFilter from "../containers/booking-progress/ItemsFilter";
import Summary from "../containers/booking-progress/Summary";
import PaymentUpload from "../containers/booking-progress/PaymentUpload";

const BookingPage = (props) => {
	const location = useLocation();
	console.log(location.state);

	let defaultPage;
	if (location.state) defaultPage = location.state.page;
	else defaultPage = 0;

	let defaultFormData;
	if (location.state)
		defaultFormData = location.state.formData;
	else
		defaultFormData = {
			type: "",
			checkin: "",
			checkout: "",
			guests: "",
		};

	let backHide = false;
	if (location.state) backHide = location.state.backHide;

	const [page, setPage] = useState(defaultPage);
	const [formData, setFormData] = useState(defaultFormData);

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
		<Summary
			page={page}
			setPage={setPage}
			formData={formData}
			setFormData={setFormData}
			backHide={backHide}
		/>,
		<PaymentUpload
			page={page}
			setPage={setPage}
			formData={formData}
			setFormData={setFormData}
			backHide={backHide}
		/>
	];

	return (
		<div className="relative top-16">
			<ProgressTracker page={page} />

			<div className="">{containerList[page]}</div>
		</div>
	);
};

export default BookingPage;
