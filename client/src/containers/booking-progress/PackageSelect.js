import React from "react";

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import Dropdown from "../../components/booking-progress/Dropdown";

// data
import * as roomData from "../../data/rooms.json";

const PackageSelect = (props) => {
	console.log(roomData);

	// props
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;

	const backHandler = () => {
		setPage(page - 1);
	};

	const nextHandler = () => {
		setPage(page + 1);
	};

	return (
		<Container>
			<Topic topic="Select Package" />

			<div className="flex flex-row mt-auto">
				<BackButton onClick={backHandler} />

				<div className="ml-auto">
					<NextButton onClick={nextHandler} />
				</div>
			</div>
		</Container>
	);
};

export default PackageSelect;
