import React, {useContext, useState} from 'react'
import PageContainer from "../components/page/PageContainer";
import { DefaultContext } from "../context/DefaultContext";
import SearchEmail from "../containers/shared/SearchEmail";
import ClientRegistration from "../containers/dashboard/ClientRegistration";
import BookingSummary from "../containers/shared/BookingSummary";

const CheckoutPage = () => {
	const { path, setPath_func } = useContext(DefaultContext);
	setPath_func();

	const [email, setEmail] = useState();
	const [clientData, setClientData] = useState({
		"First Name": "Nimal",
		"Last Name": "Silva",
		Email: "nimal@silva.com",
		"Contact No": "0773224667",
		Address: "No.22, Temple Road, Homagama",
		NIC: "768874563v",
	});

	const [reservations, setReservations] = useState([
		{
			id: 1,
			room: "Deluxe Room",
			checkin: "2022-12-18",
			checkout: "2022-12-21",
			guests: 3,
			roomCount: 2,
			price: 24000,
		},
		{
			id: 2,
			room: "Varenda Room",
			checkin: "2022-12-18",
			checkout: "2022-12-21",
			guests: 1,
			roomCount: 1,
			price: 10000,
		},
	]);

	const searchHandler = (input) => {
		console.log(input);
		setEmail(input);
	};

	return (
		<PageContainer>
			<div className="flex flex-row w-full items-start pt-2 font-manrope">
				<div className="w-1/2 pl-10">
					<SearchEmail onClick={searchHandler} />
					<ClientRegistration
						email={email}
						clientData={clientData}
						topic="Client Information"
					/>
				</div>

				<div className="w-1/2 pl-5 pr-10">
					<BookingSummary reservations={reservations} checkout={true} />
				</div>
			</div>
		</PageContainer>
	);
}

export default CheckoutPage