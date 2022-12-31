import React, { useState, useEffect } from "react";
import Input from "../../components/dashboard/InputField";

const ClientRegistration = (props) => {
	const [client, setClient] = useState(props.clientData);
	const [fname, setFname] = useState();
	const [lname, setLname] = useState();
	const [email, setEmail] = useState();
	const [contact, setContact] = useState();
	const [address, setAddress] = useState();
	const [nic, setNic] = useState();

	useEffect(() => {
		if (props.clientData) {
			setClient(props.clientData);
		}
		if (client) {
			setFname(client["First Name"]);
			setLname(client["Last Name"]);
			setEmail(client["Email"]);
			setContact(client["Contact No"]);
			setAddress(client["Address"]);
			setNic(client["NIC"]);
		}
	}, [props.clientData]);

	const clientRegisterHandler = () => {
		props.clientRegister({
			"First Name": fname,
			"Last Name": lname,
			Email: email,
			"Contact No": contact,
			Address: address,
			NIC: nic,
		});
	};

	const clearAllHandler = async () => {
		document.getElementById("firstname").value = "";
		document.getElementById("lastname").value = "";
		document.getElementById("email").value = "";
		document.getElementById("contactno").value = "";
		document.getElementById("address").value = "";
		document.getElementById("nic").value = "";
	}

	return (
		<div className="w-full p-5 bg-white my-2 rounded-lg shadow-lg">
			<div className="my-2 font-bold text-lg text-center text-black">
				{!props.topic ? "Client Registration" : props.topic}
			</div>
			<div className="flex flex-col">
				<Input
					title="First Name"
					id="firstname"
					type="text"
					input={fname}
					setInput={setFname}
					value={client["First Name"]}
				/>
				<Input
					title="Last Name"
					id="lastname"
					type="text"
					input={lname}
					setInput={setLname}
					value={client["Last Name"]}
				/>
				<Input
					title="Email"
					id="email"
					type="email"
					input={email}
					setInput={setEmail}
					value={client["Email"]}
				/>
				<Input
					title="Contact No"
					id="contactno"
					type="text"
					input={contact}
					setInput={setContact}
					value={client["Contact No"]}
				/>
				<Input
					title="Address"
					id="address"
					type="text"
					input={address}
					setInput={setAddress}
					value={client["Address"]}
				/>
				<Input
					title="NIC"
					id="nic"
					type="text"
					input={nic}
					setInput={setNic}
					value={client["NIC"]}
				/>
			</div>

			<div className="flex flex-row items-center justify-evenly mt-5">
				{!props.hideRegister &&
					Object.keys(props.clientData).length === 0 && (
						<div
							onClick={clientRegisterHandler}
							className=""
						>
							<button className="bg-textBlue text-white font-semibold px-8 py-2">
								Register
							</button>
						</div>
					)}

				{!props.hideRegister &&
					Object.keys(props.clientData).length === 0 && (
						<button
							onClick={clearAllHandler}
							className="bg-red-500 text-white font-semibold px-8 py-2"
						>
							Clear All
						</button>
					)}
			</div>
		</div>
	);
};

export default ClientRegistration;
