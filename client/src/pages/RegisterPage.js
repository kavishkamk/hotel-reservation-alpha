import React, { useContext } from "react";
import { DefaultContext } from "../context/DefaultContext";
import { useNavigate } from "react-router-dom";
import Auth__connection from "../connections/Auth";
import Registration from "../components/auth/Registration";

const RegisterPage = () => {
	const navigate = useNavigate();
	const { setMessage_func, setMessageStatus_func } =
		useContext(DefaultContext);

	const emailConfirmHandler = async (
		fname,
		lname,
		address,
		nic,
		phoneNo,
		email,
		password
	) => {
		const result = await Auth__connection.registerHandler(
			fname,
			lname,
			address,
			nic,
			phoneNo,
			email,
			password
		);

		if (result.status === false) {
			setMessage_func(false, result.message);
			setMessageStatus_func();
		} else if (result.status === true) {
			setMessage_func(true, result.message);
			setMessageStatus_func();
		}
	};

	const registerHandler = async (email, code) => {
		const result = await Auth__connection.otpConfirm(
			email,
			code
		);

		if (result.status === false) {
			setMessage_func(false, result.message);
			setMessageStatus_func();
		} else if (result.status === true) {
			navigate("/login");
		}
	};

	return (
		<div className="relative top-16 bg-[#E2E8F0]">
			<Registration
				emailConfirm={emailConfirmHandler}
				register={registerHandler}
			/>
		</div>
	);
};

export default RegisterPage;
