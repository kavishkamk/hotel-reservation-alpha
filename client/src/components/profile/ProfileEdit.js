import React, {useState, useEffect} from "react";
import Input from "./Input";

const ProfileEdit = (props) => {
	const [edit, setEdit] = useState(false)
	const [readOnly, setReadOnly] = useState(true)
	const [user, setUser] = useState(props.user)

	useEffect(()=> {
		if(readOnly && edit) setReadOnly(false)
		else setReadOnly(true)
	},[edit])

	const editHandler= ()=> {
		setEdit(true)
	}

	const saveHandler = async ()=> {
		// send the edits to the DB
		await setEdit(false)

		const firstName = document.getElementById("firstname").value
		const lastName = document.getElementById("lastname").value
		const address = document.getElementById("address").value
		const contactNumber = document.getElementById("phoneNo").value

		const user = {
			firstName: firstName,
			lastName: lastName,
      address: address,
			contactNumber: contactNumber
		}
		await props.setUser(user)
		await props.setEdited(true)
	}

	return (
		<div className="py-4 md:py-10 font-poppins">
			<Input
				id="firstname"
				label="First Name"
				type="text"
				defaultValue={user.firstName}
				placeholder="First Name"
				readonly={readOnly}
			/>

			<Input
				id="lastname"
				label="Last Name"
				type="text"
				defaultValue={user.lastName}
				placeholder="Last Name"
				readonly={readOnly}
			/>

			<Input
				id="email"
				label="Email"
				type="email"
				defaultValue={user.email}
				placeholder="Email"
				readonly={true}
			/>

			<Input
				id="phoneNo"
				label="Phone No."
				type="tel"
				defaultValue={user.contactNumber}
				placeholder="Phone No."
				readonly={readOnly}
			/>

			<Input
				id="address"
				label="Address"
				type="text"
				defaultValue={user.address}
				placeholder="Address"
				readonly={readOnly}
			/>

			<div className="w-full flex flex-row justify-between">
				<button
					onClick={editHandler}
					className="bg-textBlue text-white font-semibold px-4 py-2 my-4"
				>
					Edit details
				</button>

				<button onClick={saveHandler} className="bg-green-600 text-white font-semibold px-6 py-2 my-4">
					Save
				</button>
			</div>
		</div>
	);
};

export default ProfileEdit;
