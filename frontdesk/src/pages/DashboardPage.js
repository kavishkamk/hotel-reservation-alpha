import React, {
	useState,
	useContext,
	useEffect,
} from "react";
import PageContainer from "../components/page/PageContainer";
import TotalCounts from "../containers/dashboard/TotalCounts";
import ClientRegistration from "../containers/dashboard/ClientRegistration";
import ReservationForm from "../containers/dashboard/ReservationForm";
import SearchEmail from "../containers/shared/SearchEmail";
import { DefaultContext } from "../context/DefaultContext";
import Dashboard__connection from "../connections/Dashboard";
import Auth from "../functions/Auth";

const DashboardPage = () => {
	const {
		path,
		setPath_func,
		setMessage_func,
		setMessageStatus_func,
	} = useContext(DefaultContext);
	setPath_func();

	const [email, setEmail] = useState(Auth.getClientEmail());
	const [clientData, setClientData] = useState({});
	const [clientId, setClientId] = useState("")
	const [clientsCount, setClientsCount] = useState();
	const [reservationsCount, setReservationsCount] =
		useState();
	const [paymentsCount, setPaymentsCount] = useState();
	const [roomsList, setRoomsList] = useState([]);

	useEffect(() => {
		async function getClientCount() {
			const data =
				await Dashboard__connection.getClientCount();
			await setClientsCount(data.count);
			return;
		}

		async function getReservationtCount() {
			const data =
				await Dashboard__connection.getReservationtCount();
			await setReservationsCount(data.count);
			return;
		}

		async function getPaymentCount() {
			const data =
				await Dashboard__connection.getPaymentCount();
			await setPaymentsCount(data.count);
			return;
		}

		async function getAllRooms() {
			const data =
				await Dashboard__connection.getAllRooms();

			if (data.error) {
				setMessage_func(false, data.error);
				setMessageStatus_func();
				return;
			} 
			else if(data.data) {
				const rooms = data.data;
				await setRoomsList(rooms);
			}
		}

		getClientCount();
		getReservationtCount()
		getPaymentCount()
		getAllRooms();
	}, []);

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
				});
				await setClientId(data.user.userId)
			}
		}

		if (email.length > 0) {
			getUserByEmail(email);
		}else {
			setClientData({})
			setClientId("")
		}
	}, [email]);

	const searchHandler = (input) => {
		setEmail(input);
	};

	const clientRegisterHandler = async (client) => {
		const newClient = {
			firstName: client["First Name"],
			lastName: client["Last Name"],
			email: client["Email"],
			password: "11111111",
			contactNumber: client["Contact No"],
			address: client["Address"],
			nicNumber: client["NIC"],
		};
		const data = await Dashboard__connection.clientRegister(
			newClient
		);

		if (data.error) {
			setMessage_func(false, data.error);
			setMessageStatus_func();
		} else if (data.user) {
			setMessage_func(
				true,
				"New client successfully registered"
			);
			setMessageStatus_func();
		}
		setClientData(client);
	};

	return (
		<PageContainer>
			<div className="w-full">
				<TotalCounts
					clientsCount={clientsCount}
					reservationsCount={reservationsCount}
					paymentsCount={paymentsCount}
				/>
			</div>

			<div className="flex flex-row w-full items-start pt-2 font-manrope">
				<div className="w-1/2 pl-10">
					<SearchEmail
						onClick={searchHandler}
						setEmail={setEmail}
					/>
					<ClientRegistration
						email={email}
						clientData={clientData}
						clientRegister={clientRegisterHandler}
					/>
				</div>

				<div className="w-1/2 pl-5 pr-10">
					<ReservationForm
						roomsList={roomsList}
						email={email}
						setRoomsList={setRoomsList}
						clientId={clientId}
						clientData={clientData}
					/>
				</div>
			</div>
		</PageContainer>
	);
};

export default DashboardPage;
