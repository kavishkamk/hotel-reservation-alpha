import React, {useState, useEffect} from "react";
import Input from "./Input";

const ProfileEdit = (props) => {
	const [edit, setEdit] = useState(false)
	const [readOnly, setReadOnly] = useState(true)

	const user = {
		id: 1,
		fname: "Rashmi",
		lname: "Wijesekara",
		address: "No.20, Homagama",
		email: "rashmiw@gmail.com",
		phoneNo: "0772346573"
	};

	useEffect(()=> {
		if(readOnly && edit) setReadOnly(false)
	},[edit])

	const editHandler= ()=> {
		setEdit(true)
	}

	return (
		<div className="py-4 md:py-10">
			<Input
				id="firstname"
				label="First Name"
				type="text"
				defaultValue={user.fname}
				placeholder="First Name"
				readonly={readOnly}
			/>

			<Input
				id="lastname"
				label="Last Name"
				type="text"
				defaultValue={user.lname}
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
				defaultValue={user.phoneNo}
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

				<button className="bg-green-600 text-white font-semibold px-6 py-2 my-4">
					Save
				</button>
			</div>
		</div>
	);
};

export default ProfileEdit;
