import React, {
	useState,
	useEffect,
	useContext,
} from "react";
import TableHead from "../../components/shared/table/TableHead";
import TableBody from "../../components/shared/table/TableBody";
import Booking__connection from "../../connections/Booking";
import { DefaultContext } from "../../context/DefaultContext";
import Dates from "../../functions/Dates";
import LoadingSpinner from "../../components/shared/loading-spinner/LoadingSpinner";
import * as main from "../../connections/main-url"

const TabsContent = (props) => {
	const { setMessage_func, setMessageStatus_func } =
		useContext(DefaultContext);

	// still loading the page or not (fetching data finished or not)
	const [loading, setLoading] = useState(true);

	const [pendingData, setPendingData] = useState([]);
	const [approvedData, setApprovedData] = useState([]);
	const [checkinData, setCheckinData] = useState([]);
	const [checkoutData, setCheckoutData] = useState([]);
	const [cancelledData, setCancelledData] = useState([]);
	const [restaurentsData, setRestaurentsData] = useState([]);

	const tab = props.tab;

	const pending = [
		"Client Email",
		"Check-in",
		"Check-out",
		"Guests",
		"Room",
		"No. of Rooms",
		"Payment",
		"Status",
	];

	const cancel = [
		"Client Email",
		"Check-in",
		"Check-out",
		"Guests",
		"Room",
		"No. of Rooms",
		"Status",
	];

	const restaurentsHead = [
		"Client Email",
		"Restaurent",
		"Date",
		"Tables",
		"Guests",
		"Meal",
	];

	// useEffect(() => {
	// 	async function getAllPending() {
	// 		const data =
	// 			await Booking__connection.getAllPending();
	// 		let resultFormat = [];

	// 		if (data.error) {
	// 			await setMessage_func(false, data.error);
	// 			await setMessageStatus_func();
	// 			return;
	// 		} else {
	// 			data.data.forEach(async (item) => {
	// 				const data1 =
	// 					await Booking__connection.getRoomById(
	// 						item.roomType
	// 					);
	// 				let roomName;

	// 				if (data1.room) {
	// 					roomName = data1.room;
	// 				} else {
	// 					roomName = "---";
	// 				}
	// 				const checkin = Dates.formatDate(item.fromDate);
	// 				const checkout = Dates.formatDate(item.toDate);

	// 				resultFormat.push({
	// 					id: item.id,
	// 					name: item.userEmail,
	// 					checkin: checkin,
	// 					checkout: checkout,
	// 					guests: item.numberOfPersons,
	// 					room: roomName,
	// 					roomCount: item.numberOfRooms,
	// 					payment: "",
	// 				});
	// 			});

	// 			await setPendingData(resultFormat);
	// 		}
	// 	}

	// 	async function getAllApproved() {
	// 		const data =
	// 			await Booking__connection.getAllApproved();
	// 		let resultFormat = [];

	// 		if (data.error) {
	// 			await setMessage_func(false, data.error);
	// 			await setMessageStatus_func();
	// 			return;
	// 		} else {
	// 			data.data.forEach(async (item) => {
	// 				const data1 =
	// 					await Booking__connection.getRoomById(
	// 						item.roomType
	// 					);
	// 				let roomName;

	// 				if (data1.room) {
	// 					roomName = data1.room;
	// 				} else {
	// 					roomName = "---";
	// 				}
	// 				const checkin = Dates.formatDate(item.fromDate);
	// 				const checkout = Dates.formatDate(item.toDate);

	// 				resultFormat.push({
	// 					id: item.id,
	// 					name: item.userEmail,
	// 					checkin: checkin,
	// 					checkout: checkout,
	// 					guests: item.numberOfPersons,
	// 					room: roomName,
	// 					roomCount: item.numberOfRooms,
	// 					// payment: "",
	// 				});
	// 			});

	// 			await setApprovedData(resultFormat);
	// 		}
	// 	}

	// 	async function getAllCancelled() {
	// 		const data =
	// 			await Booking__connection.getAllCancelled();

	// 		let resultFormat = [];

	// 		if (data.error) {
	// 			await setMessage_func(false, data.error);
	// 			await setMessageStatus_func();
	// 			return;
	// 		} else {
	// 			data.data.forEach(async (item) => {
	// 				const data1 =
	// 					await Booking__connection.getRoomById(
	// 						item.roomType
	// 					);
	// 				let roomName;

	// 				if (data1.room) {
	// 					roomName = data1.room;
	// 				} else {
	// 					roomName = "---";
	// 				}
	// 				const checkin = Dates.formatDate(item.fromDate);
	// 				const checkout = Dates.formatDate(item.toDate);

	// 				resultFormat.push({
	// 					id: item.id,
	// 					name: item.userEmail,
	// 					checkin: checkin,
	// 					checkout: checkout,
	// 					guests: item.numberOfPersons,
	// 					room: roomName,
	// 					roomCount: item.numberOfRooms,
	// 				});
	// 			});

	// 			await setCancelledData(resultFormat);
	// 		}
	// 	}

	// 	async function getAllRestaurentBookings() { }

	// 	if (loading) {
	// 		getAllPending().catch((err) => {
	// 			console.log(err);
	// 		});
	// 		getAllCancelled().catch((err) => {
	// 			console.log(err);
	// 		});
	// 		getAllApproved().catch((err) => {
	// 			console.log(err);
	// 		});

	// 		setLoading(false)
	// 	}

	// }, [loading]);

	// const pendingData = [
	// 	{
	// 		id: 1,
	// 		name: "Nihal Silva",
	// 		checkin: "2022-12-22",
	// 		checkout: "2022-12-25",
	// 		guests: 3,
	// 		room: "Deluxe Room",
	// 		roomCount: 2,
	// 		payment: "http://google.com",
	// 	}
	// ];

	// const restaurentsData = [
	// 	{
	// 		id: 1,
	// 		name: "Maduka Weerasinge",
	// 		restaurent: "Sky Dine",
	// 		date: "2022-12-23",
	// 		tables: 2,
	// 		meal: "Breakfast",
	// 	}
	// ];

	useEffect(() => {
		const getAllPending = async () => {
			const pendingResultData =
				await Booking__connection.getAllPending();

				console.log(pendingResultData);

			if (pendingResultData.error) {
				await setMessage_func(
					false,
					pendingResultData.error
				);
				await setMessageStatus_func();
				return;
			} else {
				const pendingResult = await Promise.all(
					pendingResultData.data.map(async (item) => {
						let roomName;

						const roomType =
							await Booking__connection.getRoomById(
								item.roomType
							);
							
							if (roomType.room) {
								roomName = roomType.room;
							} else {
								roomName = "---";
							}
						const slip = await Booking__connection.getPaymentSlip(item.id)
						const url = main.url + "/payments" + slip;

						const checkin = Dates.formatDate(item.fromDate);
						const checkout = Dates.formatDate(item.toDate);

						return {
							id: item.id,
							name: item.userEmail,
							checkin: checkin,
							checkout: checkout,
							guests: item.numberOfPersons,
							room: roomName,
							roomCount: item.numberOfRooms,
							payment: url,
						};
					})
				);
				
				console.log(pendingResult)
				setPendingData(pendingResult);
			}
		};

		const getAllApproved = async () => {
			const approvedResultData =
				await Booking__connection.getAllApproved();

			if (approvedResultData.error) {
				await setMessage_func(
					false,
					approvedResultData.error
				);
				await setMessageStatus_func();
				return;
			} else {
				const approvedResult = await Promise.all(
					approvedResultData.data.map(async (item) => {
						const roomType =
							await Booking__connection.getRoomById(
								item.roomType
							);

						let roomName;

						if (roomType.room) {
							roomName = roomType.room;
						} else {
							roomName = "---";
						}
						const checkin = Dates.formatDate(item.fromDate);
						const checkout = Dates.formatDate(item.toDate);

						return {
							id: item.id,
							name: item.userEmail,
							checkin: checkin,
							checkout: checkout,
							guests: item.numberOfPersons,
							room: roomName,
							roomCount: item.numberOfRooms,
							// payment: "",
						};
					})
				);

				setApprovedData(approvedResult);
			}
		};

		const getAllCancelled = async () => {
			const cancelledResultData =
				await Booking__connection.getAllCancelled();

			if (cancelledResultData.error) {
				await setMessage_func(
					false,
					cancelledResultData.error
				);
				await setMessageStatus_func();
				return;
			} else {
				const cancelledResult = await Promise.all(
					cancelledResultData.data.map(async (item) => {
						const roomType =
							await Booking__connection.getRoomById(
								item.roomType
							);
						let roomName;

						if (roomType.room) {
							roomName = roomType.room;
						} else {
							roomName = "---";
						}
						const checkin = Dates.formatDate(item.fromDate);
						const checkout = Dates.formatDate(item.toDate);

						return {
							id: item.id,
							name: item.userEmail,
							checkin: checkin,
							checkout: checkout,
							guests: item.numberOfPersons,
							room: roomName,
							roomCount: item.numberOfRooms,
						};
					})
				);

				setCancelledData(cancelledResult);
			}
		};

		const getTableBookings = async () => {
			const tableData =
				await Booking__connection.getAllRestaurentBookings();

			if (tableData.error) {
				await setMessage_func(false, tableData.error);
				await setMessageStatus_func();
				return;
			} else {
				const tableBookingData = await Promise.all(
					tableData.data.map(async (item) => {
						const date = Dates.formatDate(item.fromDate)

						return {
							id: item.id,
							name: item.userEmail,
							restaurent: item.restaurentType.restaurentType,
							date: date,
							tables: item.numberOfTables,
							guests: item.numberOfPersons,
							meal: item.meal,
						};
					})
				);

				setRestaurentsData(tableBookingData);
			}
		};

		getAllPending();
		getAllApproved();
		getAllCancelled();
		getTableBookings();
	}, []);

	return (
		<>
			{tab === 1 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={pending} />
						<tbody className="">
							{pendingData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}

			{tab === 2 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={cancel} />
						<tbody className="">
							{approvedData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}

			{tab === 5 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={cancel} />
						<tbody className="">
							{cancelledData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}

			{tab === 6 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead
							tab={tab}
							columns={restaurentsHead}
						/>
						<tbody className="">
							{restaurentsData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default TabsContent;
