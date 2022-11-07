import React, { useRef, useState, useEffect } from "react";

const SelectDate = (props) => {
	const checkbtnRef = useRef();
	const [checkStatus, setCheckStatus] = useState(false);
	const [checkinDate, setCheckinDate] = useState("");
	const [checkoutDate, setCheckoutDate] = useState();
	const [guests, setGuests] = useState();

	// props
	const formData = props.formData;
	const setFormData = props.setFormData;

	let availability = true;

	useEffect(() => {
		console.log("form get ==> ");
		console.log(formData);

		if (formData.checkin) {
			setCheckinDate(formData.checkin);
			setCheckoutDate(formData.checkout);
			setGuests(formData.guests);
		}
	}, []);

	// check for availability
	const checkHandler = () => {
		const checkinInput =
			document.getElementById("checkin").value;
		const checkoutInput =
			document.getElementById("checkout").value;
		const guestCountInput =
			document.getElementById("guestCount").value;

		// all the options are selected
		if (checkinInput && checkoutInput && guestCountInput) {
			console.log(
				checkinInput,
				checkoutInput,
				guestCountInput
			);

			setFormData({
				...formData,
				checkin: checkinInput,
				checkout: checkoutInput,
				guests: guestCountInput,
			});

			checkbtnRef.current.classList.remove(
				"bg-lightPurple"
			);
			checkbtnRef.current.classList.add("bg-[#10B981]");

			// ***********************************
			// if selected dates available, display "available"
			if (availability) {
				setCheckStatus(true);
			}

		}
	};

	// control guest count
	const GuestInputHandler = (e) => {
		if (e.target.value < 1) e.target.value = 1;
	};

	return (
		<div className="mx-auto w-full">
			<div className="flex flex-col xl:flex-row rounded-lg py-5 md:p-10 my-5 bg-lightBlueGray w-full md:w-fit mx-auto xl:p-3">
				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Check in
					</div>
					<input
						type="date"
						id="checkin"
						defaultValue={checkinDate}
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-3 md:my-0 md:text-xl rounded-lg px-3 mx-2"
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
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-3 md:my-0 md:text-xl rounded-lg px-3 mx-2"
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
						className="bg-lightBlueGray w-[120px] text-[#10B981] font-semibold px-3 mx-2 my-3 md:my-0 md:text-xl "
					/>
				</div>

				<button
					onClick={checkHandler}
					ref={checkbtnRef}
					className="cursor-pointer hover:shadow-xl uppercase md:text-xl mx-auto text-center 
				font-bold text-white bg-lightPurple rounded-xl h-auto px-3 flex items-center my-4 xl:my-0 py-3 xl:py-0"
				>
					<div className="cursor-pointer ">
						{checkStatus === false
							? `CHECK AVAILABILITY`
							: `AVAILABLE`}
					</div>
				</button>
			</div>
		</div>
	);
};

export default SelectDate;
