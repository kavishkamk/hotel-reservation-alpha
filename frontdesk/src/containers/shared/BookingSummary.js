import React, { useState, useEffect } from "react";
import SummaryContainer from "../../components/shared/SummaryContainer";

const BookingSummary = (props) => {
	const [reservation, setReservation] = useState(
		props.reservations
	);

	useEffect(() => {
		async function setData() {
			await setReservation(props.reservations);
		}

		if (props.reservations) {
			setData();
		}
	}, [props.reservations]);

	return (
		<div className="w-full p-5 bg-white my-2 rounded-lg shadow-lg max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] overflow-y-auto">
			<div className="my-2 font-bold text-lg text-center text-black">
				Booking Summary
			</div>

			{reservation && (
				<div className="flex flex-col gap-y-5">
					{reservation.map((order) => (
						<SummaryContainer
							item={order}
							checkout={props.checkout}
							checkinHandler={props.checkinHandler}
							checkoutHandler={props.checkoutHandler}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default BookingSummary;
