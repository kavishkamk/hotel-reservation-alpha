import React from 'react'
import SummaryContainer from "../../components/shared/SummaryContainer"

const BookingSummary = (props) => {
	return (
		<div className="w-full p-5 bg-white my-2 rounded-lg shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
			<div className="my-2 font-bold text-lg text-center text-black">
				Booking Summary
			</div>

			<div className="flex flex-col gap-y-5">
				{props.reservations.map((order) => (
					<SummaryContainer item={order} />
				))}
			</div>
		</div>
	);
}

export default BookingSummary