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
	const [deleteLine, setDeleteLine] = useState({});
	const [refreshTab, setRefreshTab] = useState(0)

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

	const getAllPending = async () => {
		const pendingResultData =
			await Booking__connection.getAllPending();

		if (pendingResultData.error) {
			await setMessage_func(false, pendingResultData.error);
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
					const slip =
						await Booking__connection.getPaymentSlip(
							item.id
						);

					let url;
					if (slip == "error") url = "";
					else url = main.url + "/payments" + slip;

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
						roomCount: item.numberOfRooms
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
					const date = Dates.formatDate(item.fromDate);

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

	useEffect(() => {
		getAllPending();
		getAllApproved();
		getAllCancelled();
		getTableBookings();
	}, []);

	useEffect(()=> {
		if(refreshTab === 5){
			// cancelled
			getAllCancelled();
		}else if(refreshTab === 2) {
			// approved
			getAllApproved();
		}
	}, [refreshTab])

	useEffect(()=> {
		if(deleteLine.length > 0) {
			const newPendingData = pendingData
				.map((item) => {
					if (deleteLine !== item.id) {
						return item;
					}
				})
				.filter(
					(notUndefined) => notUndefined !== undefined
				);
			setPendingData(newPendingData)
			setDeleteLine("")
		}
	}, [deleteLine])

	const deleteLineHandler = (id, refreshTab) => {
		setDeleteLine(id)
		setRefreshTab(refreshTab)
	}

	return (
		<>
			{tab === 1 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={pending} />
						<tbody className="">
							{pendingData.map((data) => data !== undefined && (
								<TableBody tab={tab} data={data} setDeleteLine={deleteLineHandler} />
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
