import React from 'react'
import {useLocation} from "react-router-dom"
import LogoImage from "../assets/logo.svg"

const PrintPage = (props) => {
	const location = useLocation();
	// console.log(location.state.data)

	const today = new Date().toLocaleString();
	// 12/14/2022, 11:01:47 AM

	const reservationDetails = {
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "0773224667",
		checkin: '2022-12-14',
		checkout: "2022-12-19",
		guests: 3,
		nights: 5,
		room: 
			{
				id: 1,
				name: "Deluxe Room",
				count: 2,
				price: 12000,
			},
		total: 120000
	};

	// window.print()

	return (
		<div className="max-w-2xl mx-auto p-4">
			<div className="flex flex-row items-start justify-between pb-2 border-b-2">
				<div className="w-1/4">
					<img src={LogoImage} alt="logo" />
				</div>

				<div className="font-manrope text-sm">
					<div className="text-center font-bold py-1 text-base">
						Golden Aurora Hotel
					</div>
					<div className="space-y-1 text-xs">
						<p className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5 mr-2 sm:mr-6"
							>
								<path
									fillRule="evenodd"
									d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
									clipRule="evenodd"
								></path>
							</svg>
							<span>No.23/A, Beach Road, Colombo 6</span>
						</p>
						<p className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5 mr-2 sm:mr-6"
							>
								<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
							</svg>
							<span>+94123456789</span>
						</p>
						<p className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5 mr-2 sm:mr-6"
							>
								<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
								<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
							</svg>
							<span>contact@goldenaurora.lk</span>
						</p>
					</div>
				</div>
			</div>

			<div className="text-lg my-4 font-bold font-poppins text-center">
				INVOICE
			</div>

			<div className="w-fit ml-auto flex flex-row font-poppins text-sm">
				<div className="">
					<div className="">Invoice Date :</div>
					<div className="">Check-in :</div>
					<div className="">Check-out :</div>
				</div>
				<div className="ml-5">
					<div className="">{today}</div>
					<div className="">
						{reservationDetails.checkin}
					</div>
					<div className="">
						{reservationDetails.checkout}
					</div>
				</div>
			</div>

			<div className="mt-4">
				<div className="font-poppins font-bold w-1/3 border-b-2 border-black">
					Guest Details
				</div>
				<div className="flex flex-row font-poppins text-sm">
					<div className="">
						<div className="">Name :</div>
						<div className="">Email :</div>
						<div className="">Contact :</div>
					</div>

					<div className="ml-5">
						<div className="">
							{reservationDetails.name}
						</div>
						<div className="">
							{reservationDetails.email}
						</div>
						<div className="">
							{reservationDetails.phone}
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto text-black mt-5">
				<div className="font-poppins font-bold w-1/3 mb-2">
					Booking Details
				</div>
				<div className="overflow-x-auto font-inter">
					<table className="min-w-full text-xs">
						{/* <thead className="bg-gray-100">
							<tr className="text-left">
								<th className="p-3">Detail</th>
								<th className="p-3 text-right">Amount</th>
							</tr>
						</thead> */}
						<tbody>
							<tr className="border border-opacity-20 border-gray-700 ">
								<td className="p-2">
									<p>No. of Guests</p>
								</td>
								<td className="p-2 text-right">
									<p>{reservationDetails.guests}</p>
								</td>
							</tr>

							<tr className="border border-opacity-20 border-gray-700 ">
								<td className="p-2">
									<p>
										{reservationDetails.room.name +
											" (per day)"}
									</p>
								</td>
								<td className="p-2 text-right">
									<p>Rs.{reservationDetails.room.price}</p>
								</td>
							</tr>

							<tr className="border border-opacity-20 border-gray-700 ">
								<td className="p-2">
									<p>No. of Rooms</p>
								</td>
								<td className="p-2 text-right">
									<p>
										{"x " + reservationDetails.room.count}
									</p>
								</td>
							</tr>

							<tr className="border border-opacity-20 border-gray-700 ">
								<td className="p-2">
									<p>Nights</p>
								</td>
								<td className="p-2 text-right">
									<p>{"x "+ reservationDetails.nights}</p>
								</td>
							</tr>

							<tr className="border border-y-4 border-opacity-20 border-gray-700 text-lg font-bold font-poppins">
								<td className="p-2">
									<p>Total Amount :</p>
								</td>
								<td className="p-2 text-right">
									<p>Rs.{reservationDetails.total}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default PrintPage