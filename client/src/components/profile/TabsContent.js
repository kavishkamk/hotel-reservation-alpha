import React from "react";

// data
import confirmedData from "../../data/confirmed.json";

const TabsContent = (props) => {
	
	let statusColor = "bg-textBlue"
	let status = props.status

	if(props.status === "History"){
		status = null
	}else if(props.status === "Booking"){
		status = "pending"
		statusColor = "bg-gray-400"
	}else if(props.status === "Confirmed"){
		statusColor = "bg-green-400"
	}else if(props.status === "Cancelled"){
		statusColor = "bg-red-400"
	}

	return (
		<div className="container w-full p-2 mx-auto ">
			<div className="min-w-full text-xs">
				{confirmedData.map((item) => {
					return (
						<div className="flex flex-row items-center justify-between p-3 rounded-lg my-2 text-textBlue font-medium bg-[#E2E8F0]">
							<div className="w-full">
								{item.checkIn && (
									<div className="flex flex-row">
										<div className="w-1/4 font-bold">
											Check-in Date :
										</div>
										<div className="">{item.checkIn}</div>
									</div>
								)}
								{item.checkOut && (
									<div className="flex flex-row">
										<div className="w-1/4 font-bold">
											Check-out Date :
										</div>
										<div className="">{item.checkOut}</div>
									</div>
								)}
								{item.room && (
									<div className="flex flex-row">
										<div className="w-1/4 font-bold">
											Room Type :
										</div>
										<div className="">{item.room}</div>
									</div>
								)}
								{item.cost && (
									<div className="flex flex-row">
										<div className="w-1/4 font-bold">
											Total Cost :
										</div>
										<div className="">{`Rs.${item.cost}/=`}</div>
									</div>
								)}
								{item.date && (
									<div className="flex flex-row">
										<div className="w-1/4 font-bold">
											Reserved Date :
										</div>
										<div className="">{item.date}</div>
									</div>
								)}
								{item.restaurent && (
									<div className="flex flex-row">
										<div className="w-1/4 font-bold">
											Restaurent :
										</div>
										<div className="">
											{item.restaurent}
										</div>
									</div>
								)}
								{item.tables && (
									<div className="flex flex-row">
										<div className="w-1/4 font-bold">
											No. of Tables :
										</div>
										<div className="">{item.tables}</div>
									</div>
								)}
								{item.meal && (
									<div className="flex flex-row">
										<div className="w-1/4 font-bold">
											Meal :
										</div>
										<div className="">{item.meal}</div>
									</div>
								)}
							</div>
							{status && (
								<div className={"px-3 py-1 font-semibold rounded-md text-white "+ statusColor}>
									{status}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TabsContent;
