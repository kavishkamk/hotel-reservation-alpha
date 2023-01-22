import React from 'react'
import Socials from "../../assets/home-page/social-medias.png"

const Footer = () => {
	return (
		<div className="bg-[#1E293B] relative py-10 mt-16">
			<div className="flex flex-col text-center md:flex-row justify-between items-center px-10 font-poppins text-white my-auto text-xs">
				<div className="">
					All copyrights reserved by The Golden Aurora Hotel
					- © 2022
				</div>
				<div className="cursor-pointer my-8 md:my-0">
					<img src={Socials} alt="social medias" />
				</div>
				<div className="">
					Website Designed & Developed by Micronovo
				</div>
			</div>
		</div>
	);
}

export default Footer