import React, { useState, useEffect } from "react";
import SelectRoomAvailability from "../../components/dashboard/SelectRoomAvailability";
import Dashboard__connection from "../../connections/Dashboard";
import Dates from "../../functions/Dates";

const ReservationForm = (props) => {
	const [formData, setFormData] = useState();
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [availableRooms, setAvailableRooms] = useState(
		props.roomsList
	);
	const [multiply, setMultiply] = useState()

	useEffect(() => {
		async function checkAvailability(check) {
			const data =
				await Dashboard__connection.checkAvailability(
					check
				);
			console.log(data);

			// set rooms list according to the availability
			// setAvailableRooms(data.rooms)
		}

		if (formData) {
			console.log(formData);
			const diff = Dates.getDifferenceInDays(
				formData.checkin,
				formData.checkout
			);
			console.log("diff => " + diff);
			setMultiply(diff * formData.rooms)
		}

		// TODO: check availability
		// checkAvailability(formData)
		// TODO: load available rooms list

	}, [formData]);

	useEffect(() => {
		setAvailableRooms(props.roomsList);
	}, [props.roomsList]);

	// const availableRooms = [
	// 	{
	// 		id: 1,
	// 		name: "Executive Garden Room",
	// 		price: 15000,
	// 	}
	// ];

	const roomCheckHandler = (event, id, room) => {
		const status = event.target.checked;

		if (status === true) {
			setSelectedRooms([...selectedRooms, room]);

			setTotalAmount(totalAmount + (room.price * multiply));
		} else {
			setSelectedRooms((current) =>
				current.filter((room) => room.id !== id)
			);
			setTotalAmount(totalAmount - (room.price * multiply));
		}
	};

	const bookSubmitHandler = async()=> {

	}

	return (
		<div className="w-full p-5 bg-white rounded-lg shadow-lg max-h-[calc(100vh-10rem)] min-h-[calc(100vh-10rem)] overflow-y-auto">
			<SelectRoomAvailability
				formData={formData}
				setFormData={setFormData}
				disabled={props.clientId.length > 0 ? false : true}
			/>

			{/* selecting rooms */}
			<div className="flex flex-col gap-y-5 font-manrope">
				{availableRooms.length > 0 && (
					<div className="">
						<div className="font-semibold">Rooms</div>
						<div className="">
							{availableRooms.map((room) => {
								return (
									<div className="flex flex-row items-center justify-between w-full bg-gray-200 rounded-lg px-2 py-1 my-1 text-sm">
										<label
											htmlFor={room.id}
											className="w-full pr-4"
										>
											<div className="flex flex-row items-center justify-between gap-x-5">
												<div className="">{room.name}</div>
												<div className="">
													Rs.{room.price}
												</div>
											</div>
										</label>
										<input
											onChange={(event) =>
												roomCheckHandler(
													event,
													room.id,
													room
												)
											}
											type="checkbox"
											id={room.id}
											name={room.name}
											value={room.name}
											disabled={!multiply ? true : false}
										/>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>

			<div className="w-full text-center flex flex-row items-center justify-between pr-5 my-3">
				<div className="font-semibold">
					Total amount due :
				</div>
				<div className="text-red-600 font-bold text-xl">
					{`Rs.${totalAmount.toFixed(2)}/=`}
				</div>
			</div>

			{totalAmount > 0 && (
				<div className="w-full flex items-center justify-center">
					<button onClick={bookSubmitHandler} className="bg-green-600 text-white font-bold px-8 py-2">
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default ReservationForm;
