import React, {
	useContext,
	useState,
	useEffect,
} from "react";
import PageContainer from "../components/page/PageContainer";
import { DefaultContext } from "../context/DefaultContext";
import SearchEmail from "../containers/shared/SearchEmail";
import ClientRegistration from "../containers/dashboard/ClientRegistration";
import BookingSummary from "../containers/shared/BookingSummary";
import Dashboard__connection from "../connections/Dashboard";
import Checkout__connection from "../connections/Checkout";
import Booking__connection from "../connections/Booking";
import Auth from "../functions/Auth";
import Dates from "../functions/Dates";

const CheckoutPage = () => {
	const {
		path,
		setPath_func,
		setMessage_func,
		setMessageStatus_func,
	} = useContext(DefaultContext);
	setPath_func();

	const [email, setEmail] = useState(Auth.getClientEmail());
	const [clientData, setClientData] = useState({});

	const [reservations, setReservations] = useState();
	// [
		// {
		// 	id: 1,
		// 	room: "Deluxe Room",
		// 	checkin: "2022-12-18",
		// 	checkout: "2022-12-21",
		// 	guests: 3,
		// 	roomCount: 2,
		// 	price: 24000,
		// },
		// {
		// 	id: 2,
		// 	room: "Varenda Room",
		// 	checkin: "2022-12-18",
		// 	checkout: "2022-12-21",
		// 	guests: 1,
		// 	roomCount: 1,
		// 	price: 10000,
		// },
	// ];
	
	const searchHandler = (input) => {
		console.log(input);
		// setEmail(input);
	};

	useEffect(() => {
		async function getUserByEmail(email) {
			const data =
				await Dashboard__connection.getUserByEmail(email);
			// console.log(data);

			if (data.error) {
				setMessage_func(false, data.error);
				setMessageStatus_func();
			} else if (data.user) {
				Auth.saveClientEmail(email);

				await setClientData({
					"First Name": data.user.firstName,
					"Last Name": data.user.lastName,
					Email: data.user.email,
					"Contact No": data.user.contactNumber,
					Address: data.user.address,
					NIC: data.user.nicNumber,
					id: data.user.userId,
				});
			}
		}

		if (email.length > 0) {
			// console.log(email);
			getUserByEmail(email);
		}
	}, [email]);

	useEffect(() => {
		async function getBookingSummary(id) {
			const data =
				await Checkout__connection.getBookingSummary(id);
			let result = [];

			if (data.error) {
				setMessage_func(false, data.error);
				setMessageStatus_func();
			} else if (data.data) {
				data.data.forEach(async (order) => {
					// console.log(order)

					const data1 =
						await Booking__connection.getRoomById(
							order.roomType
						);
					let roomName;

					if (data1.room) {
						roomName = data1.room;
					} else {
						roomName = "---";
					}

					const checkin = Dates.formatDateTime(
						order.checkIn
					);
					const checkout = Dates.formatDate(order.toDate);

					result.push({
						id: order.id,
						room: roomName,
						checkin: checkin,
						checkout: checkout,
						guests: order.numberOfPersons,
						roomCount: order.numberOfRooms,
						price: order.totalPrice,
					});
				});
				// console.log("result");
				// console.log(result);
				await setReservations(result);
			}
		}
		if (clientData.id) {
			getBookingSummary(clientData.id);
		}
	}, [clientData]);

	useEffect(() => {
		console.log(reservations);
	}, [reservations]);

	return (
		<PageContainer>
			<div className="flex flex-row w-full items-start pt-2 font-manrope">
				<div className="w-1/2 pl-10">
					<SearchEmail onClick={searchHandler} />
					<ClientRegistration
						email={email}
						clientData={clientData}
						topic="Client Information"
						hideRegister={true}
					/>
				</div>

				<div className="w-1/2 pl-5 pr-10">
					{reservations && (
						<BookingSummary
							reservations={reservations}
							checkout={true}
						/>
					)}
				</div>
			</div>
		</PageContainer>
	);
};

export default CheckoutPage;
