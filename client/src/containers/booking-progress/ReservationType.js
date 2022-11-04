import React, { useState, useRef } from "react";

// images
import offersImage from "../../assets/booking-progress/offers.png";
import packagesImage from "../../assets/booking-progress/packages.png";
import restaurentsImage from "../../assets/booking-progress/restaurents.png";
import roomsImage from "../../assets/booking-progress/rooms.png";

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";

const ReservationType = () => {
	const [selected, setSelected] = useState();
	const ref = useRef();

	const reservationTypesData = [
		{
			id: 1,
			image: roomsImage,
			title: "Rooms",
		},
		{
			id: 2,
			image: packagesImage,
			title: "Packages",
		},
		{
			id: 3,
			image: offersImage,
			title: "Offers",
		},
		{
			id: 4,
			image: restaurentsImage,
			title: "Restaurents",
		},
	];

	const backHandler = () => {
		console.log("back");
	};

	const nextHandler = () => {
		if(selected){
			// cannot go to the next pg until select an item
			console.log("next");
		}
	};

	// set the id of selected item
	const selectHandler = (id) => {
		setSelected(id);
	};

	return (
		<Container>
			<Topic topic="Reservation Type " />
			<div className="flex flex-row flex-wrap gap-y-4 w-full mx-auto my-10">
				{reservationTypesData.map((item) => (
					<div key={item.id} className="w-[180px] mx-auto">
						<div
							ref={ref}
							onClick={() => selectHandler(item.id)}
							className={
								`h-28 cursor-pointer rounded hover:bg-[#9FA2E7] flex items-center justify-center 
									${selected === item.id
									? "bg-[#9FA2E7] "
									: "bg-[#E6E7FE54] "}`
							}
						>
							<img
								src={item.image}
								alt="packages"
								className="mx-auto my-auto"
							/>
						</div>
						<div className="uppercase w-fit mx-auto text-textBlue my-2">
							{item.title}
						</div>
					</div>
				))}
			</div>

			<div className="flex flex-row mt-auto">
				<BackButton onClick={backHandler} />

				<div className="ml-auto">
					<NextButton onClick={nextHandler} />
				</div>
			</div>
		</Container>
	);
};

export default ReservationType;
