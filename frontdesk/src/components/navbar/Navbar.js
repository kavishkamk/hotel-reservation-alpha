import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg"
import Navbtn from "./Navbtn"
import {DefaultContext} from "../../context/DefaultContext"
import Auth from "../../functions/Auth"

const Navbar = (props) => {
	const {setSure_func, setSureStatus_func} = useContext(DefaultContext)

	const navigate = useNavigate();

	const navigateHandler = (route) => {
		navigate(route);
	};

	const logoutHandler = () => {
		setSure_func("Are you sure you want to log out?", "Log out")
		setSureStatus_func()
	};

	return (
		<div className="flex flex-row px-10 py-3 justify-between items-center fixed top-0 left-0 right-0">
			<div
				onClick={() => navigateHandler("/")}
				className="cursor-pointer w-48"
			>
				<img src={Logo} alt="logo" />
			</div>

			{Auth.isAuthenticated() && (
				<div className="flex flex-row gap-x-20 items-center justify-evenly">
					<Navbtn
						onClick={() => navigateHandler("/")}
						name="Dashboard"
						path="/"
						currentPath={props.currentPath}
					/>
					<Navbtn
						onClick={() => navigateHandler("/checkin")}
						name="Check-in"
						path="/checkin"
						currentPath={props.currentPath}
					/>
					<Navbtn
						onClick={() => navigateHandler("/checkout")}
						name="Check-out"
						path="/checkout"
						currentPath={props.currentPath}
					/>
					<Navbtn
						onClick={() => navigateHandler("/booking")}
						name="Booking"
						path="/booking"
						currentPath={props.currentPath}
					/>

					<Navbtn
						onClick={logoutHandler}
						name="Log out"
						currentPath={props.currentPath}
					/>
				</div>
			)}
		</div>
	);
}

export default Navbar