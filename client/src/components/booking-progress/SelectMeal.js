import React, { useRef, useState, useEffect, useCallback } from "react";
import { Selectable } from "@robertz65/lyte";
import SingleDropdown from "./SingleDropdown";

const SelectDate = (props) => {
	const checkbtnRef = useRef();
	const [checkStatus, setCheckStatus] = useState(null);
	const [date, setDate] = useState("");
	const [Tables, setTables] = useState();
	const [guests, setGuests] = useState();
	const [meal, setMeal] = useState([]);

	let selectedMeal = [];

	const formData = props.formData;
	const setFormData = props.setFormData;

	if (formData.meal) {
		selectedMeal = formData.meal;
	}

	let availability = true;

	const mealsList = [
		{ label: 1, content: "Breakfast" },
		{ label: 2, content: "Lunch" },
		{ label: 3, content: "Dinner" },
	];

	useEffect(() => {
		if (formData.date) {
			setDate(formData.date);
			setTables(formData.Tables);
			setMeal(formData.meal);
			setGuests(formData.guests);
		}
	}, [formData]);

	// check for availability
	const checkHandler = async () => {
		const dateInput = document.getElementById("date").value;
		const TableCountInput =
			document.getElementById("TableCount").value;
		const GuestCountInput = document.getElementById("GuestCount").value;
		const mealInput = selectedMeal;

		// all the options are selected
		if (dateInput && TableCountInput && mealInput && GuestCountInput) {
			await setMeal(selectedMeal);

			setFormData({
				...formData,
				date: dateInput,
				Tables: TableCountInput,
				meal: mealInput,
				guests: GuestCountInput
			});

			checkbtnRef.current.classList.remove(
				"bg-lightPurple"
			);

			if (availability) {
				checkbtnRef.current.classList.add("bg-[#10B981]");
				setCheckStatus(true);
			} else if (availability === false) {
				checkbtnRef.current.classList.add("bg-red-400");
				setCheckStatus(false);
			}
		}
	};

	// control tables count
	const TableInputHandler = (e) => {
		if (e.target.value < 1) e.target.value = 1;
	};

	// control guests count
	const guestsInputHandler = (e) => {
		if (e.target.value < 1) e.target.value = 1;
	};

	const StatusDisplayHandler = (checkStatus) => {
		let text;
		if (checkStatus === null) text = `CHECK AVAILABILITY`;
		else if (checkStatus === true) text = `AVAILABLE`;
		else if (checkStatus === false) text = `NOT AVAILABLE`;

		return text;
	};

	const setMealHandler = useCallback(async (selection) => {
		await setMeal(selection);
		// prevent re-rendering the dropdown component when click on search button
	}, []);

	return (
		<div className="mx-auto w-full font-inter">
			<div className="flex flex-col xl:flex-row rounded-lg py-5 md:p-10 my-5 bg-lightBlueGray w-full md:w-fit mx-auto xl:p-3">
				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Date
					</div>
					<input
						type="date"
						id="date"
						defaultValue={date}
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-3 md:my-0 md:text-lg rounded-lg px-0 mx-2"
					/>
				</div>

				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Tables
					</div>
					<input
						type="number"
						id="TableCount"
						min="1"
						defaultValue={Tables}
						onKeyUp={TableInputHandler}
						className="bg-lightBlueGray w-[100px] text-[#10B981] font-semibold px-3 mx-2 my-3 md:my-0 md:text-lg "
					/>
				</div>

				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Guests
					</div>
					<input
						type="number"
						id="GuestCount"
						min="1"
						defaultValue={guests}
						onKeyUp={guestsInputHandler}
						className="bg-lightBlueGray w-[100px] text-[#10B981] font-semibold px-3 mx-2 my-3 md:my-0 md:text-lg "
					/>
				</div>

				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						meal
					</div>
					<div className="bg-lightBlueGray w-[120px] text-[#10B981] font-semibold px-3 mx-2 my-3 md:my-0">
						<div className="">
							<div className="text-sm">
								<Selectable
									width="100%"
									options={mealsList}
									defaultValue={selectedMeal}
									onChange={(values) => {
										selectedMeal = values;
									}}
								/>
							</div>
						</div>
					</div>
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
