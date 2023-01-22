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
			name: "Booking",
		},
		{
			id: 3,
			name: "Cancelled",
		},
		{
			id: 4,
			name: "Check-in",
		},
		{
			id: 5,
			name: "Check-out",
		},
	];

	const tabSelectHandler = (id) => {
		setSelected(id);
	};

	return (
		<div className="bg-white p-5 rounded-xl shadow-xl max-w-[99%] overflow-x-auto min-h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)]">
			<div className="-ml-2 flex items-center text-gray-900 font-poppins font-semibold mb-5">
				{tabsList.map((tab) => {
					return (
						<div
							onClick={() => tabSelectHandler(tab.id)}
							className={
								"cursor-pointer px-2 md:px-5 py-3 border-b-4 whitespace-nowrap " +
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

			<div className="-mx-8 md:mx-0 min-w-full max-h-[calc(100vh-20rem)] font-manrope">
				<TabsContent status={tabsList[selected - 1].name} />
			</div>
		</div>
	);
};

export default Bookings;
