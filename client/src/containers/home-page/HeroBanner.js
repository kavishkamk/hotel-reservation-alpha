import React from 'react'
import { useNavigate } from "react-router-dom";
import Hero from "../../assets/home-page/hero.png"
import Calendar from "../../assets/home-page/calendar.svg"

const HeroBanner = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-black relative border-b-8 border-b-[#6B71CB]">
			<img
				src={Hero}
				alt="hero banner"
				className="opacity-50"
			/>

			<div className="absolute left-0 right-0 text-center top-10 md:top-[35%] text-lg md:text-3xl font-poppins font-bold text-white">
				Find the best hotel in Colombo area
				<div className="text-xl md:text-5xl my-3 md:my-10">
					Golden Aurora
				</div>
			</div>

			{/* book now button */}
			<div
				onClick={() => navigate("/booking-process")}
				className="cursor-pointer hover:bg-black absolute bottom-0 right-0 flex flex-row gap-1 items-center border-t-[#FBBC05] border-l-[#FBBC05] border-t-2 border-l-8 px-3 mr-2 md:mr-10 py-2 md:py-4 mb-2"
			>
				<div className="text-[#FBBC05] font-semibold uppercase md:text-xl font-inter">
					Book Now
				</div>
				<div className="">
					<img src={Calendar} alt="calendar icon" />
				</div>
			</div>
		</div>
	);
}

export default HeroBanner