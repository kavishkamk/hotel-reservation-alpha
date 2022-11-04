import React from 'react'

// images
import checkinImage from "../../assets/booking-progress/checkin.png"

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container"
import Topic from "../../components/booking-progress/Topic"
import SelectDate from "../../components/booking-progress/SelectDate"

const CheckinCheckout = () => {
	const backHandler = () => {}

	const nextHandler = () => {}

	return (
		<Container>
			<Topic topic="Select Check-in / Check-out" />

			<div className="mx-auto md:w-[80%] lg:w-[50%]">
				<img src={checkinImage} alt="check-in" />
			</div>

			<SelectDate />

			<div className="flex flex-row mt-auto">
				<BackButton onClick={backHandler} />

				<div className="ml-auto">
					<NextButton onClick={nextHandler} />
				</div>
			</div>
		</Container>
	);
}

export default CheckinCheckout