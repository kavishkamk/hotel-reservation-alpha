import React, { useRef, useState, useEffect } from "react";

const SelectDate = (props) => {
	const checkbtnRef = useRef();
	const [checkStatus, setCheckStatus] = useState(null);
	const [checkinDate, setCheckinDate] = useState("");
	const [checkoutDate, setCheckoutDate] = useState();
	const [guests, setGuests] = useState();
	const [rooms, setRooms] = useState();

	const formData = props.formData;
	const setFormData = props.setFormData;

	let availability = false;

	useEffect(() => {
		if (formData.checkin) {
			setCheckinDate(formData.checkin);
			setCheckoutDate(formData.checkout);
			setGuests(formData.guests);
			setRooms(formData.rooms);
		}
	}, [formData]);

	// check for availability
	const checkHandler = () => {
		const checkinInput =
			document.getElementById("checkin").value;
		const checkoutInput =
			document.getElementById("checkout").value;
		const guestCountInput =
			document.getElementById("guestCount").value;
		const roomsCountInput =
			document.getElementById("roomsCount").value;

		// all the options are selected
		if (
			checkinInput &&
			checkoutInput &&
			guestCountInput &&
			roomsCountInput
		) {

			setFormData({
				...formData,
				checkin: checkinInput,
				checkout: checkoutInput,
				guests: guestCountInput,
				rooms: roomsCountInput,
			});
		}
	};

	// control guest count
	const GuestInputHandler = (e) => {
		if (e.target.value < 1) e.target.value = 1;
	};

	// control rooms count
	const RoomsInputHandler = (e) => {
		if (e.target.value < 1) e.target.value = 1;
	};

	const StatusDisplayHandler = (checkStatus) => {
		let text;
		if(checkStatus === null)
			text = `CHECK AVAILABILITY`
		else
			text = `CHECK AVAILABILITY`;
			
			return text
	}

	return (
		<div className="mx-auto font-inter">
			<div className="flex flex-col xl:flex-row rounded-lg py-5 md:p-10 my-5 bg-lightBlueGray w-full md:w-fit mx-auto xl:p-3">
				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Check in
					</div>
					<input
						type="date"
						id="checkin"
						defaultValue={checkinDate}
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-3 md:my-0 md:text-lg rounded-lg px-0 mx-2"
					/>
				</div>

				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Check out
					</div>
					<input
						type="date"
						id="checkout"
						defaultValue={checkoutDate}
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-3 md:my-0 md:text-lg rounded-lg px-0 mx-2"
					/>
				</div>

				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						guests
					</div>
					<input
						type="number"
						id="guestCount"
						min="1"
						defaultValue={guests}
						onKeyUp={GuestInputHandler}
						className="bg-lightBlueGray w-[80px] text-[#10B981] font-semibold px-3 mx-2 my-3 md:my-0 md:text-lg "
					/>
				</div>

				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						rooms
					</div>
					<input
						type="number"
						id="roomsCount"
						min="1"
						defaultValue={rooms}
						onKeyUp={RoomsInputHandler}
						className="bg-lightBlueGray w-[80px] text-[#10B981] font-semibold px-3 mx-2 my-3 md:my-0 md:text-lg "
					/>
				</div>

				<button
					onClick={checkHandler}
					ref={checkbtnRef}
					className="cursor-pointer hover:shadow-xl uppercase md:text-lg mx-auto text-center 
				font-bold text-white bg-lightPurple rounded-xl h-auto px-3 flex items-center my-4 xl:my-0 py-3 xl:py-0"
				>
					<div className="cursor-pointer ">
						{StatusDisplayHandler(checkStatus)}
					</div>
				</button>
			</div>
		</div>
	);
};

export default SelectDate;
