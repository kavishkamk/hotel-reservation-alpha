import React, {
	useState,
	useContext,
	useEffect,
} from "react";
import PageContainer from "../components/page/PageContainer";
import SearchEmail from "../containers/shared/SearchEmail";
import ClientRegistration from "../containers/dashboard/ClientRegistration";
import { DefaultContext } from "../context/DefaultContext";
import BookingSummary from "../containers/shared/BookingSummary";
import Auth from "../functions/Auth";
import Dashboard__connection from "../connections/Dashboard";
import Checkin__connection from "../connections/Checkin";
import Booking__connection from "../connections/Booking";
import Dates from "../functions/Dates";

const CheckinPage = () => {
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

	async function getBookingSummary(id) {
		const checkinSummary =
			await Checkin__connection.getBookingSummary(id);

		if (checkinSummary.error) {
			await setMessage_func(false, checkinSummary.error);
			await setMessageStatus_func();
			return;
		} else if (checkinSummary.data) {
			const result = await Promise.all(
				checkinSummary.data.map(async (item) => {
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

					const checkin = Dates.formatDate(item.fromDate);
					const checkout = Dates.formatDate(item.toDate);

					return {
						id: item.id,
						checkin: checkin,
						checkout: checkout,
						guests: item.numberOfPersons,
						price: item.totalPrice,
						room: roomName,
						roomType: item.roomType,
						roomCount: item.numberOfRooms,
						roomPrice: item.roomPrice,
					};
				})
			);

			setReservations(result);
		}
	}

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
			getBookingSummary(clientData.id);
		}
	}, [email]);

	const checkinHandler = async (id) => {
		if (Object.keys(clientData).length > 0) {
			const res = await Checkin__connection.setCheckin(id);

			if (res.error) {
				setMessage_func(false, res.error);
				setMessageStatus_func();
			} else if (res.status) {
				await setMessage_func(true, "Successfully checked-in");
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
							checkinHandler={checkinHandler}
						/>
					)}
				</div>
			</div>
		</PageContainer>
	);
};

export default CheckinPage;
