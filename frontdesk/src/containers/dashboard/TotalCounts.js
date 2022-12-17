import React from 'react'

const TotalCounts = () => {
	const clientsCount = 67
	const reservationsCount = 32
	const paymentsCount = 54

	return (
		<div className="flex flex-row pt-2 font-manrope">
			<div className="flex flex-row items-center justify-between w-full mx-32 py-1 px-4 bg-black text-white font-bold">
				<div className="">Total Clients</div>
				<div className="">{clientsCount}</div>
			</div>

			<div className="flex flex-row items-center justify-between w-full mx-32 py-1 px-4 bg-black text-white font-bold">
				<div className="">Total Reservations</div>
				<div className="">{reservationsCount}</div>
			</div>

			<div className="flex flex-row items-center justify-between w-full mx-32 py-1 px-4 bg-black text-white font-bold">
				<div className="">Total Payments</div>
				<div className="">{paymentsCount}</div>
			</div>
		</div>
	);
}

export default TotalCounts