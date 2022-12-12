import React from 'react'
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg"
import Navbtn from "./Navbtn"

const Navbar = () => {
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
				/>
				<Navbtn
					onClick={() => navigateHandler("/checkin")}
					name="Check-in"
				/>
				<Navbtn
					onClick={() => navigateHandler("/checkout")}
					name="Check-out"
				/>
				<Navbtn
					onClick={() => navigateHandler("/booking")}
					name="Booking"
				/>

			</div>
		</div>
	);
}

export default Navbar