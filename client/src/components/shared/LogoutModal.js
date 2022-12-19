import React, { useContext } from "react";
import { DefaultContext } from "../../context/DefaultContext";
import Auth from "../../functions/Auth";
import { useNavigate } from "react-router-dom";
import Auth__connection from "../../connections/Auth";

const LogoutModal = (props) => {
	const navigate = useNavigate();

	const {
		sure,
		setSureStatus_func,
		setMessage_func,
		setMessageStatus_func,
		setLogin_func
	} = useContext(DefaultContext);

	const logoutHandler = async () => {
		const result = await Auth__connection.logoutHandler();

		if (result) {
			Auth.logout(() => {
				navigate("/");
			});

			await setLogin_func();
			await props.setLoginStatus(props.loginStatus + 1);
		} 
		else {
			setMessage_func(false, "Something went wrong");
			setMessageStatus_func();
		}
		setSureStatus_func();
	};

	const cancelHandler = () => {
		setSureStatus_func();
	};

	return (
		<>
			<div className="font-poppins fixed inset-x-0 inset-y-0 w-fit h-fit z-30 m-auto">
				<div className="flex flex-col max-w-md gap-2 p-10 px-16 rounded-md shadow-xl bg-slate-100 text-gray-900">
					<h2 className="text-lg font-semibold leading-tight tracking-wide">
						{sure.message}
					</h2>
					<div className="flex flex-col justify-between gap-3 mt-6 sm:flex-row">
						<button
							onClick={cancelHandler}
							className="px-6 py-2 rounded-sm bg-textBlue text-white"
						>
							Cancel
						</button>
						<button
							onClick={logoutHandler}
							className="px-6 py-2 rounded-sm shadow-sm bg-red-400 text-white"
						>
							{sure.btnName}
						</button>
					</div>
				</div>
			</div>
			<div
				onClick={cancelHandler}
				className="fixed left-0 right-0 backdrop-blur-sm z-20 top-0 bottom-0"
			></div>
		</>
	);
};

export default LogoutModal;
