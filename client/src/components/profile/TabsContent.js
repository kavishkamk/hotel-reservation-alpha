import React, { useState, useEffect } from "react";
import Profile__connection from "../../connections/Profile";
import Rooms__connection from "../../connections/Rooms";
import Dates from "../../functions/Dates";
import TabsItem from "./TabsItem";
import { Navigate } from "react-router-dom";

const TabsContent = (props) => {
	const [confirmedData, setConfirmedData] = useState([]);
	const [paidData, setPaidData] = useState([]);
	const [bookingData, setBookingData] = useState([]);
	const [cancelledData, setCancelledData] = useState([]);
	const [checkinData, setCheckinData] = useState([]);
	const [checkoutData, setCheckoutData] = useState([])
	const [paymentStatus, setPaymentStatus] = useState(false);
	const [paymentData, setPaymentData] = useState({})

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

	useEffect(() => {
		async function getBookingData() {
			const data =
				await Profile__connection.bookingRecords();
			let result = [];

			console.log("bookings")
			console.log(data);

			if (data.data) {
				data.data.forEach(async (record) => {
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

					result.push({
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
						rooms: record.numberOfRooms,
						guests: record.numberOfPersons,
						roomId: record.roomType
					});
				});

				// console.log(result)

				await setBookingData(result);
			} else {
				console.log(data.error);
			}
		}

		async function getConfirmedData() {
			const data =
				await Profile__connection.confirmedRecords();
			let result = [];

			console.log("confirmed")
			console.log(data);

			if (data.data) {
				data.data.forEach(async (record) => {
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

					result.push({
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
					});
				});
				await setConfirmedData(result);
			} else {
				console.log(data.error);
			}
		}

		async function getCancelledData() {
			const data =
				await Profile__connection.cancelledRecords();
			let result = [];

			console.log("cancelled")
			console.log(data);

			if (data.data) {
				data.data.forEach(async (record) => {
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

					result.push({
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
					});
				});
				await setCancelledData(result);
			} else {
				console.log(data.error);
			}
		}

		async function getCheckinData() {
			const data =
				await Profile__connection.checkinRecords();
			let result = [];

			console.log("checkin");
			console.log(data);

			if (data.data) {
				data.data.forEach(async (record) => {
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

					result.push({
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
					});
				});
				await setCheckinData(result);
			} else {
				console.log(data.error);
			}
		}

		async function getCheckoutData() {
			const data =
				await Profile__connection.checkoutRecords();
			let result = [];

			console.log("checkout");
			console.log(data);

			if (data.data) {
				data.data.forEach(async (record) => {
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

					result.push({
						id: record.id,
						checkIn: checkin,
						checkOut: checkout,
						room: roomName,
						cost: record.totalPrice,
					});
				});
				await setCheckoutData(result);
			} else {
				console.log(data.error);
			}
		}

		getBookingData();
		getConfirmedData();
		getCancelledData();
		getCheckinData();
		getCheckoutData();

	}, []);

	const paymentHandler = async (item)=> {
		console.log(item)

		const data1 =
			await Rooms__connection.getFullRoomById(item.roomId)

		// const details = Rooms__connection.roomDetails;
		// const images = Rooms__connection.images;

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
			bookStatus: true
		})
		setPaymentStatus(true);
		
	}

	useEffect(()=> {
		console.log(paymentData);
	}, [paymentData])

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
							<div className="w-full text-center text-lg font-semibold mt-20">No Data</div>
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
							<div className="w-full text-center text-lg font-semibold mt-20">No Data</div>
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
							<div className="w-full text-center text-lg font-semibold mt-20">No Data</div>
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
							<div className="w-full text-center text-lg font-semibold mt-20">No Data</div>
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
							<div className="w-full text-center text-lg font-semibold mt-20">No Data</div>
						))}
				</div>
			</div>
		</>
	);
};

export default TabsContent;
