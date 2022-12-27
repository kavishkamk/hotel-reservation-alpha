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
	const [clientsCount, setClientsCount] = useState();
	const [reservationsCount, setReservationsCount] =
		useState(78);
	const [paymentsCount, setPaymentsCount] = useState(55);

	useEffect(() => {
		async function getClientCount() {
			const data =
				await Dashboard__connection.getClientCount();
			await setClientsCount(data.count);
			return
		}

		// TODO: fetch reservations and payments counts

		getClientCount();
	}, []);

	useEffect(() => {
		async function getUserByEmail(email) {
			const data =
				await Dashboard__connection.getUserByEmail(email);
			console.log(data);

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
			}
		}

		if (email.length > 0) {
			console.log(email);
			getUserByEmail(email);
		}
	}, [email]);

	const searchHandler = (input) => {
		// console.log(input)
		setEmail(input);
	};

	const clientRegisterHandler = async (client) => {
		console.log(client);
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
		console.log(data);
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
					<SearchEmail onClick={searchHandler} />
					<ClientRegistration
						email={email}
						clientData={clientData}
						clientRegister={clientRegisterHandler}
					/>
				</div>

				<div className="w-1/2 pl-5 pr-10">
					<ReservationForm />
				</div>
			</div>
		</PageContainer>
	);
};

export default DashboardPage;
