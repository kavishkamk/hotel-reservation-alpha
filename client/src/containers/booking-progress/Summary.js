import React, { useState } from "react";

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import CardContainer from "../../components/cards/CardContainer";
import SummaryLine from "../../components/booking-progress/SummaryLine"

const Summary = (props) => {
	// props
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;
	const item = formData.item

	console.log("inside summary ===>>")
	console.log(formData)

	const backHandler = () => {
		setPage(page - 1);
	};

	const bookHandler = ()=> {

	}

	return (
		<div className="">
			<Container>
				<Topic topic="Booking Summary" />
				<div className="flex flex-col xl:flex-row justify-between my-5">
					<CardContainer
						title={item.name}
						image={item.image}
						description={item.description}
						item={item}
						hideBookBtn={true}
					/>
					<div className="w-full px-4 my-6 xl:my-0">
						<SummaryLine
							topic={`Check-in Date : `}
							item={formData.checkin}
						/>
						<SummaryLine
							topic={`Check-out Date : `}
							item={formData.checkout}
						/>
						<SummaryLine
							topic={`Guests : `}
							item={formData.guests}
						/>
						<SummaryLine
							topic={`Rooms : `}
							item={formData.rooms}
						/>
					</div>
				</div>

				<div className="flex flex-row mt-auto pt-5">
					{!props.backHide && (<BackButton onClick={backHandler} />)}

					<div className="ml-auto">
						<NextButton
							onClick={bookHandler}
							name="Book Now"
						/>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Summary