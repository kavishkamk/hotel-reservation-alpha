import React from 'react'
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg"
import Navbtn from "./Navbtn"

const Navbar = (props) => {
	const navigate = useNavigate();

	const navigateHandler = (route) => {
		navigate(route);
	};

	return (
		<div className="flex flex-row px-10 py-3 justify-between items-center fixed top-0 left-0 right-0">
			<div
				onClick={() => navigateHandler("/")}
				className="cursor-pointer w-48"
			>
				<img src={Logo} alt="logo" />
			</div>

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

			</div>
		</div>
	);
}

export default Navbar