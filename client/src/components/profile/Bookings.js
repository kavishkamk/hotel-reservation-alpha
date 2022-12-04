import React, { useState } from "react";
import TabsContent from "./TabsContent"

const Bookings = (props) => {
	const [selected, setSelected] = useState(1);

	const tabsList = [
		{
			id: 1,
			name: "Confirmed",
		},
		{
			id: 2,
			name: "Paid",
		},
		{
			id: 3,
			name: "Booking",
		},
		{
			id: 4,
			name: "Cancelled",
		},
		{
			id: 5,
			name: "History",
		},
	];

	const tabSelectHandler = (id) => {
		console.log(id);
		setSelected(id);
	};

	return (
		<div className="bg-white p-5 rounded-xl shadow-xl max-w-[99%] overflow-x-auto">
			<div className="-ml-2 flex items-center text-gray-900 font-poppins font-semibold mb-5">
				{tabsList.map((tab) => {
					return (
						<div
							onClick={() => tabSelectHandler(tab.id)}
							className={
								"cursor-pointer px-2 md:px-5 py-3 border-b-4 " +
								(tab.id === selected
									? "border-textBlue text-textBlue"
									: "border-gray-400")
							}
						>
							{tab.name}
						</div>
					);
				})}
			</div>

			<div className="-mx-8 md:mx-0 min-w-full max-w-80">
				<TabsContent status={tabsList[selected-1].name} />
			</div>
		</div>
	);
};

export default Bookings;
