import React, {
	useState,
	useEffect,
	useContext,
} from "react";
import SelectRoomAvailability from "../../components/dashboard/SelectRoomAvailability";
import Dashboard__connection from "../../connections/Dashboard";
import Dates from "../../functions/Dates";
import { DefaultContext } from "../../context/DefaultContext";
import Auth from "../../functions/Auth";

const ReservationForm = (props) => {
	const {
		setMessage_func,
		setMessageStatus_func,
		setSure_func,
		setSureVerify_func,
		sureVerify,
		setSureStatus_func,
		setSureModalDisplay_func,
	} = useContext(DefaultContext);

	const [formData, setFormData] = useState();
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [availableRooms, setAvailableRooms] = useState(
		props.roomsList
	);
	const [multiply, setMultiply] = useState();
	const [submitHandleStatus, setSubmitHandleStatus] =
		useState(false);
	const [reservationData, setReservationData] = useState(
		{}
	);

	useEffect(() => {
		async function checkAvailability(check) {
			const data =
				await Dashboard__connection.checkAvailability(
					check
				);

			// set rooms list according to the availability
			if (data.error) {
				await setMessage_func(false, data.error);
				await setMessageStatus_func();
				return;
			} else {
				setAvailableRooms(data.rooms);
				await setMessage_func(
					true,
					"Available rooms list updated"
				);
				await setMessageStatus_func();
				await setTotalAmount(0);
				return;
			}
		}

		if (formData) {
			const diff = Dates.getDifferenceInDays(
				formData.checkin,
				formData.checkout
			);
			setMultiply(diff * formData.rooms);

			// check availability
			const checkData = {
				numberOfRooms: formData.rooms,
				numberOfPersons: formData.guests,
				fromDate: formData.checkin,
				toDate: formData.checkout,
			};
			checkAvailability(checkData);
		}
	}, [formData]);

	useEffect(() => {
		setAvailableRooms(props.roomsList);
	}, [props.roomsList]);

	const roomCheckHandler = (event, id, room) => {
		const status = event.target.checked;

		if (status === true) {
			setSelectedRooms([...selectedRooms, room]);

			setTotalAmount(totalAmount + room.price * multiply);
		} else {
			setSelectedRooms((current) =>
				current.filter((room) => room.id !== id)
			);
			setTotalAmount(totalAmount - room.price * multiply);
		}
	};

	const bookSubmitHandler = async () => {
		setSureModalDisplay_func(true);
		setSure_func("Confirm the reservation ?", "Confirm");
		setSureStatus_func();

		await setSubmitHandleStatus(true);
	};

	useEffect(() => {
		async function fetchData(book) {
			const data = await Dashboard__connection.roomBooking(
				book
			);

			if (data.error) {
				await setMessage_func(false, data.error);
				await setMessageStatus_func();
				return;
			} else {
				await setMessage_func(
					true,
					"Successfully reserved"
					);
				await setMessageStatus_func();
				await setReservationData(data.booking);
				return;
			}
		}
		if (
			sureVerify === true &&
			submitHandleStatus === true
		) {
			const book = {
				roomTypeId: selectedRooms[0].id,
				numberOfRooms: formData.rooms,
				numberOfPersons: formData.guests,
				fromDate: formData.checkin,
				toDate: formData.checkout,
				clientId: props.clientId,
				email: props.email
			};
			fetchData(book);
			setSureVerify_func(false);
			setSubmitHandleStatus(false);
		}
	}, [sureVerify, submitHandleStatus]);

	useEffect(()=> {
		// save the printing data on the session storage
		if (Object.keys(reservationData).length > 0) {
			Auth.savePrintReserveData({
				id: reservationData._id,
				name: `${props.clientData["First Name"]} ${props.clientData["Last Name"]}`,
				email: props.clientData["Email"],
				phone: props.clientData["Contact No"],
				checkin: reservationData.fromDate,
				checkout: reservationData.toDate,
				guests: reservationData.numberOfPersons,
				nights: reservationData.nights,
				room: {
					id: reservationData.roomType.id,
					name: reservationData.roomType.roomType,
					count: reservationData.numberOfRooms,
					price: reservationData.roomType.price,
				},
				total: reservationData.totalPrice,
			});

			// make the payment
			window.open("/print", "_blank", "height=full");
		}
	}, [reservationData])

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
					<button
						onClick={bookSubmitHandler}
						className="bg-green-600 text-white font-bold px-8 py-2"
					>
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default ReservationForm;
