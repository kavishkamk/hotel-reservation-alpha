import React, { useRef, useState, useEffect } from "react";

const SelectRoomAvailability = (props) => {
	const checkbtnRef = useRef();
	const [checkStatus, setCheckStatus] = useState(null);
	const [checkinDate, setCheckinDate] = useState("");
	const [checkoutDate, setCheckoutDate] = useState();
	const [guests, setGuests] = useState();
	const [rooms, setRooms] = useState();

	const formData = props.formData;
	const setFormData = props.setFormData;

	let availability = false;

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
			console.log(
				checkinInput,
				checkoutInput,
				guestCountInput,
				roomsCountInput
			);

			setFormData({
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

	return (
		<div className="mx-auto w-full">
			<div className="flex flex-row items-center justify-evenly rounded-lg mb-2 pb-2 bg-lightBlueGray w-full mx-auto">
				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Check in
					</div>
					<input
						type="date"
						id="checkin"
						defaultValue={checkinDate}
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-0 rounded-lg px-3 mx-2"
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
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-0 rounded-lg px-3 mx-2"
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
						className="bg-lightBlueGray w-[100px] text-[#10B981] font-semibold px-3 mx-2 my-0"
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
						className="bg-lightBlueGray w-[100px] text-[#10B981] font-semibold px-3 mx-2 my-0"
					/>
				</div>
			</div>
			<div className="w-full flex items-center justify-center">
				<button
					onClick={checkHandler}
					disabled={props.disabled}
					className="bg-textBlue text-white font-bold px-4 py-2 disabled:bg-slate-300"
				>
					Check Availability
				</button>
			</div>
		</div>
	);
};

export default SelectRoomAvailability;
