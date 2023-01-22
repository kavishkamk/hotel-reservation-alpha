import React, { useState, useRef, useEffect } from "react";
import restaurentsImage from "../../assets/booking-progress/restaurents.png";
import roomsImage from "../../assets/booking-progress/rooms.png";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";

const ReservationType = (props) => {
	const [selected, setSelected] = useState();
	const ref = useRef();
	
	const page = props.page
	const setPage = props.setPage
	const formData = props.formData
	const setFormData = props.setFormData

	useEffect(() => {
		setSelected(formData.type)
		setFormData({...formData, type: selected})
	}, [])
	

	const reservationTypesData = [
		{
			id: 1,
			image: roomsImage,
			title: "Rooms",
		},
		// {
		// 	id: 2,
		// 	image: packagesImage,
		// 	title: "Packages",
		// },
		// {
		// 	id: 3,
		// 	image: offersImage,
		// 	title: "Offers",
		// },
		{
			id: 4,
			image: restaurentsImage,
			title: "Restaurents",
		},
	];

	const nextHandler = () => {
		// cannot go to the next pg until select an item
		if(selected){
			setFormData({ ...formData, type: selected });
			setPage(page + 1)
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
				<div className="ml-auto">
					<NextButton onClick={nextHandler} />
				</div>
			</div>
		</Container>
	);
};

export default ReservationType;
