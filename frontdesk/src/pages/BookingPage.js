import React, { useContext, useState } from "react";
import PageContainer from "../components/page/PageContainer";
import { DefaultContext } from "../context/DefaultContext";
import TabsContent from "../containers/booking/TabsContent"

const BookingPage = () => {
	const [selected, setSelected] = useState(1);
	const { path, setPath_func } = useContext(DefaultContext);
	setPath_func();

	const tabsList = [
		{
			id: 1,
			name: "Pending",
		},
		{
			id: 2,
			name: "Approved",
		},
		// {
		// 	id: 3,
		// 	name: "Check-in",
		// },
		// {
		// 	id: 4,
		// 	name: "Check-out",
		// },
		{
			id: 5,
			name: "Cancelled",
		},
		{
			id: 6,
			name: "Restaurents",
		},
	];

	const tabSelectHandler = (id) => {
		setSelected(id);
	};

	return (
		<PageContainer>
			<div className="py-3 flex items-center justify-center gap-x-4 font-poppins font-bold">
				{tabsList.map((tab) => {
					return (
						<div
							onClick={() => tabSelectHandler(tab.id)}
							className={
								"cursor-pointer w-40 text-sm text-center py-3 text-white rounded-full " +
								(tab.id === selected
									? "bg-[#FA7800]"
									: "bg-black")
							}
						>
							{tab.name}
						</div>
					);
				})}
			</div>

			<div className="-mx-8 md:mx-0 min-w-full max-h-[calc(100vh-20rem)] font-manrope">
				<TabsContent tab={selected} />
			</div>
		</PageContainer>
	);
};

export default BookingPage;
