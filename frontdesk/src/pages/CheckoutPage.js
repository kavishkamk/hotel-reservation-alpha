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
	const [reservations, setReservations] = useState([]);

	useEffect(() => {
		async function getUserByEmail(email) {
			const data =
				await Dashboard__connection.getUserByEmail(email);

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
			getUserByEmail(email);
		}
	}, [email]);

	async function getBookingSummary(id) {
		const data =
			await Checkout__connection.getBookingSummary(id);

		if (data.error) {
			setMessage_func(false, data.error);
			setMessageStatus_func();
		} else if (data.data) {
			const fullData = await Promise.all(
				data.data.map(async (order) => {
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

					return {
						id: order.id,
						room: roomName,
						checkin: checkin,
						checkout: checkout,
						guests: order.numberOfPersons,
						roomCount: order.numberOfRooms,
						price: order.totalPrice,
					};
				})
			);
			setReservations(fullData);
		}
	}

	useEffect(() => {
		if (clientData.id) {
			getBookingSummary(clientData.id);
		}
	}, [clientData]);

	const checkoutHandler = async (id) => {
		if (Object.keys(clientData).length > 0) {
			const res = await Checkout__connection.setCheckout(id);

			if (res.error) {
				setMessage_func(false, res.error);
				setMessageStatus_func();
			} else if (res.status) {
				await setMessage_func(
					true,
					"Successfully checked-out"
				);
				await setMessageStatus_func();

				await Promise.all(getBookingSummary(clientData.id));
			}
		}
	};

	return (
		<PageContainer>
			<div className="flex flex-row w-full items-start pt-2 font-manrope">
				<div className="w-1/2 pl-10">
					<SearchEmail />
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
							checkoutHandler={checkoutHandler}
						/>
					)}
				</div>
			</div>
		</PageContainer>
	);
};

export default CheckoutPage;
