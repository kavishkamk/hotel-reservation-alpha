import React, { useState, useEffect, useContext } from "react";
import Profile__connection from "../../connections/Profile";
import Rooms__connection from "../../connections/Rooms";
import Dates from "../../functions/Dates";
import TabsItem from "./TabsItem";
import { Navigate } from "react-router-dom";
import {DefaultContext} from "../../context/DefaultContext"

const TabsContent = (props) => {
	const [confirmedData, setConfirmedData] = useState([]);
	const [paidData, setPaidData] = useState([]);
	const [bookingData, setBookingData] = useState([]);
	const [cancelledData, setCancelledData] = useState([]);
	const [checkinData, setCheckinData] = useState([]);
	const [checkoutData, setCheckoutData] = useState([]);
	const [paymentStatus, setPaymentStatus] = useState(false);
	const [paymentData, setPaymentData] = useState({});

	const {setMessageStatus_func, setMessage_func} = useContext(DefaultContext)

	let statusColor = "bg-textBlue";
	let status = props.status;

	if (props.status === "History") {
		status = null;
	} else if (props.status === "Booking") {
		status = "pending";
		statusColor = "bg-gray-400";
	} else if (props.status === "Confirmed") {
		statusColor = "bg-green-400";
	} else if (props.status === "Cancelled") {
		statusColor = "bg-red-400";
	}

	const getBookingData = async () => {
		const data = await Profile__connection.bookingRecords();

		if (data.data) {
			const result = await Promise.all(
				data.data.map(async (record) => {
					const data1 = await Rooms__connection.getRoomById(
						record.roomType
					);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}

					const checkin = Dates.formatDate(record.fromDate);
					const checkout = Dates.formatDate(record.toDate);

					return {
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
						rooms: record.numberOfRooms,
						guests: record.numberOfPersons,
						roomId: record.roomType,
					};
				})
			);

			setBookingData(result);
		} else {
			await setMessage_func(false, data.error);
			await setMessageStatus_func();
		}
	};

	const getConfirmedData = async () => {
		const data =
			await Profile__connection.confirmedRecords();

		if (data.data) {
			const result = await Promise.all(
				data.data.map(async (record) => {
					const data1 = await Rooms__connection.getRoomById(
						record.roomType
					);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}

					const checkin = Dates.formatDate(record.fromDate);
					const checkout = Dates.formatDate(record.toDate);

					return {
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
					};
				})
			);
			await setConfirmedData(result);
		} else {
			await setMessage_func(false, data.error);
			await setMessageStatus_func();
		}
	};

	const getCancelledData = async () => {
		const data =
			await Profile__connection.cancelledRecords();

		if (data.data) {
			const result = await Promise.all(
				data.data.map(async (record) => {
					const data1 = await Rooms__connection.getRoomById(
						record.roomType
					);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}

					const checkin = Dates.formatDate(record.fromDate);
					const checkout = Dates.formatDate(record.toDate);

					return {
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
					};
				})
			);
			await setCancelledData(result);
		} else {
			await setMessage_func(false, data.error);
			await setMessageStatus_func();
		}
	};

	const getCheckinData = async () => {
		const data = await Profile__connection.checkinRecords();

		if (data.data) {
			const result = await Promise.all(
				data.data.map(async (record) => {
					const data1 = await Rooms__connection.getRoomById(
						record.roomType
					);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}

					const checkin = Dates.formatDate(record.fromDate);
					const checkout = Dates.formatDate(record.toDate);

					return {
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
					};
				})
			);
			await setCheckinData(result);
		} else {
			await setMessage_func(false, data.error);
			await setMessageStatus_func();
		}
	};

	const getCheckoutData = async () => {
		const data =
			await Profile__connection.checkoutRecords();

		if (data.data) {
			const result = await Promise.all(
				data.data.map(async (record) => {
					const data1 = await Rooms__connection.getRoomById(
						record.roomType
					);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}

					const checkin = Dates.formatDate(record.fromDate);
					const checkout = Dates.formatDate(record.toDate);

					return {
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
					};
				})
			);
			await setCheckoutData(result);
		} else {
			await setMessage_func(false, data.error);
			await setMessageStatus_func();
		}
	};

	useEffect(() => {
		getBookingData();
		getConfirmedData();
		getCancelledData();
		getCheckinData();
		getCheckoutData();
	}, []);

	const paymentHandler = async (item) => {
		const data1 = await Rooms__connection.getFullRoomById(
			item.roomId
		);

		const roomData = {
			name: data1.room.roomType,
			image: data1.room.imageURL,
			description: data1.room.description,
			images: data1.room.images,
			price: data1.room.price,
			stars: data1.room.stars,
			tags: data1.room.tags,
			details: data1.room.details,
			id: data1.room.id,
		};
		setPaymentData({
			type: 1,
			checkin: item.checkIn,
			checkout: item.checkOut,
			orderId: item.id,
			roomType: item.room,
			cost: item.cost,
			guests: item.guests,
			rooms: item.rooms,
			item: roomData,
			bookStatus: true,
		});
		setPaymentStatus(true);
	};

	return (
		<>
			{paymentStatus && (
				<Navigate
					to="/booking-process"
					state={{
						page: 3,
						formData: paymentData,
						backHide: true,
					}}
					replace={false}
				/>
			)}
			<div className="container w-full p-2 mx-auto ">
				<div className="min-w-full text-xs">
					{status === "pending" &&
						(bookingData.length > 0 ? (
							bookingData.map((item) => {
								return (
									<TabsItem
										status={status}
										statusColor={statusColor}
										item={item}
										onClick={() => paymentHandler(item)}
									/>
								);
							})
						) : (
							<div className="w-full text-center text-lg font-semibold mt-20">
								No Data
							</div>
						))}

					{status === "Confirmed" &&
						(confirmedData.length > 0 ? (
							confirmedData.map((item) => {
								return (
									<TabsItem
										status={status}
										statusColor={statusColor}
										item={item}
									/>
								);
							})
						) : (
							<div className="w-full text-center text-lg font-semibold mt-20">
								No Data
							</div>
						))}

					{status === "Cancelled" &&
						(cancelledData.length > 0 ? (
							cancelledData.map((item) => {
								return (
									<TabsItem
										status={status}
										statusColor={statusColor}
										item={item}
									/>
								);
							})
						) : (
							<div className="w-full text-center text-lg font-semibold mt-20">
								No Data
							</div>
						))}

					{props.status == "Check-in" &&
						(checkinData.length > 0 ? (
							checkinData.map((item) => {
								return (
									<TabsItem
										status={status}
										statusColor={statusColor}
										item={item}
									/>
								);
							})
						) : (
							<div className="w-full text-center text-lg font-semibold mt-20">
								No Data
							</div>
						))}

					{props.status == "Check-out" &&
						(checkoutData.length > 0 ? (
							checkoutData.map((item) => {
								return (
									<TabsItem
										status={status}
										statusColor={statusColor}
										item={item}
									/>
								);
							})
						) : (
							<div className="w-full text-center text-lg font-semibold mt-20">
								No Data
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default TabsContent;
