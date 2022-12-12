import React, {useState} from "react";
import PageContainer from "../components/page/PageContainer"
import TotalCounts from "../containers/dashboard/TotalCounts"
import ClientRegistration from "../containers/dashboard/ClientRegistration"
import ReservationForm from "../containers/dashboard/ReservationForm"
import SearchEmail from "../containers/shared/SearchEmail"

const DashboardPage = () => {
	const [email, setEmail] = useState()
	const [clientData, setClientData] = useState({
		"First Name": "Nimal",
		"Last Name": "Silva",
		Email: "nimal@silva.com",
		"Contact No": "0773224667",
		Address: "No.22, Temple Road, Homagama",
		NIC: "768874563v",
	});

	const searchHandler = (input)=> {
		console.log(input)
		setEmail(input)
	}

	const clientRegisterHandler = (client)=> {
		setClientData(client)
		console.log(clientData)
	}

	return (
		<PageContainer>
			<div className="w-full">
				<TotalCounts />
			</div>

			<div className="flex flex-row w-full items-start pt-2">
				<div className="w-1/2 pl-10">
					<SearchEmail onClick={searchHandler} />
					<ClientRegistration email={email} clientData={clientData} clientRegister={clientRegisterHandler} />
				</div>

				<div className="w-1/2 pl-5 pr-10">
					<ReservationForm />
				</div>
			</div>
		</PageContainer>
	);
};

export default DashboardPage;
