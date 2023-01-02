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

const TabsContent = (props) => {
	const { setMessage_func, setMessageStatus_func } =
		useContext(DefaultContext);

	const [pendingData, setPendingData] = useState([]);
	const [approvedData, setApprovedData] = useState([]);
	const [checkinData, setCheckinData] = useState([]);
	const [checkoutData, setCheckoutData] = useState([]);
	const [cancelledData, setCancelledData] = useState([]);
	const [restaurentsData, setRestaurentsData] = useState([
		{
			id: 1,
			name: "Maduka Weerasinge",
			restaurent: "Sky Dine",
			date: "2022-12-23",
			tables: 2,
			meal: "Breakfast",
		},
		{
			id: 2,
			name: "Rashmi Wijesekara",
			restaurent: "Sky Dine",
			date: "2022-12-12",
			tables: 2,
			meal: "Dinner",
		},
		{
			id: 3,
			name: "Tharanga Silva",
			restaurent: "Chinese",
			date: "2022-12-23",
			tables: 1,
			meal: "Lunch",
		},
	]);

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
		"Name",
		"Restaurent",
		"Date",
		"Tables",
		"Meal",
	];

	useEffect(() => {
		async function getAllPending() {
			const data =
				await Booking__connection.getAllPending();
			let resultFormat = [];

			if (data.error) {
				await setMessage_func(false, data.error);
				await setMessageStatus_func();
				return;
			} else {
				data.data.forEach(async (item) => {
					const data1 =
						await Booking__connection.getRoomById(
							item.roomType
						);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}
					const checkin = Dates.formatDate(item.fromDate);
					const checkout = Dates.formatDate(item.toDate);

					resultFormat.push({
						id: item.id,
						name: item.userEmail,
						checkin: checkin,
						checkout: checkout,
						guests: item.numberOfPersons,
						room: roomName,
						roomCount: item.numberOfRooms,
						payment: "",
					});
				});

				await setPendingData(resultFormat);
			}
		}

		async function getAllApproved() {
			const data =
				await Booking__connection.getAllApproved();
			let resultFormat = [];

			if (data.error) {
				await setMessage_func(false, data.error);
				await setMessageStatus_func();
				return;
			} else {
				data.data.forEach(async (item) => {
					const data1 =
						await Booking__connection.getRoomById(
							item.roomType
						);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}
					const checkin = Dates.formatDate(item.fromDate);
					const checkout = Dates.formatDate(item.toDate);

					resultFormat.push({
						id: item.id,
						name: item.userEmail,
						checkin: checkin,
						checkout: checkout,
						guests: item.numberOfPersons,
						room: roomName,
						roomCount: item.numberOfRooms,
						// payment: "",
					});
				});

				await setApprovedData(resultFormat);
			}
		}

		async function getAllCheckin() {
			const data =
				await Booking__connection.getAllCheckin();
			let resultFormat = [];

			if (data.error) {
				await setMessage_func(false, data.error);
				await setMessageStatus_func();
				return;
			} else {
				data.data.forEach(async (item) => {
					const data1 =
						await Booking__connection.getRoomById(
							item.roomType
						);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}
					const checkin = Dates.formatDate(item.fromDate);
					const checkout = Dates.formatDate(item.toDate);

					resultFormat.push({
						id: item.id,
						name: item.userEmail,
						checkin: checkin,
						checkout: checkout,
						guests: item.numberOfPersons,
						room: roomName,
						roomCount: item.numberOfRooms,
						// payment: "",
					});
				});

				await setCheckinData(resultFormat);
			}
		}

		async function getAllCheckout() {}

		async function getAllCancelled() {
			const data =
				await Booking__connection.getAllCancelled();

			let resultFormat = [];

			if (data.error) {
				await setMessage_func(false, data.error);
				await setMessageStatus_func();
				return;
			} else {
				data.data.forEach(async (item) => {
					const data1 =
						await Booking__connection.getRoomById(
							item.roomType
						);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}
					const checkin = Dates.formatDate(item.fromDate);
					const checkout = Dates.formatDate(item.toDate);

					resultFormat.push({
						id: item.id,
						name: item.userEmail,
						checkin: checkin,
						checkout: checkout,
						guests: item.numberOfPersons,
						room: roomName,
						roomCount: item.numberOfRooms,
					});
				});

				await setCancelledData(resultFormat);
			}
		}

		async function getAllRestaurentBookings() {}

		getAllPending();
		getAllCancelled();
		getAllApproved();
	}, []);

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
