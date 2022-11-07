import React, {useEffect, useState} from 'react'

// images
import checkinImage from "../../assets/booking-progress/checkin.png"

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container"
import Topic from "../../components/booking-progress/Topic"
import SelectDate from "../../components/booking-progress/SelectDate"

const CheckinCheckout = (props) => {
	// props
	const page = props.page
	const setPage = props.setPage
	const formData = props.formData;
	const setFormData = props.setFormData;

	useEffect(() => {
		console.log(formData)
	}, [formData])

	const backHandler = () => {
		setPage(page - 1)
	}

	const nextHandler = () => {
		// setPage(page + 1)
	}

	return (
		<Container>
			<Topic topic="Select Check-in / Check-out" />

			<div className="mx-auto md:w-[80%] lg:w-[50%]">
				<img src={checkinImage} alt="check-in" />
			</div>

			{formData && 
			<SelectDate 
				formData={formData}
				setFormData={setFormData}
			/>}

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