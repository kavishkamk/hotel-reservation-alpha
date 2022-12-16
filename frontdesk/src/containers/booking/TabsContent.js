import React from 'react'
import TableHead from "../../components/shared/table/TableHead"
import TableBody from "../../components/shared/table/TableBody"

const TabsContent = (props) => {
	const tab = props.tab

	const pending = [
		"Name", "Check-in", "Check-out", "Guests", "Room", "No. of Rooms", "Payment", "Status"
	]

	const restaurentsHead = [
		"Name", "Restaurent", "Date", "Tables", "Meal",
	]

	const pendingData = [
		{
			id: 1,
			name: "Nihal Silva",
			checkin: "2022-12-22",
			checkout: "2022-12-25",
			guests: 3,
			room: "Deluxe Room",
			roomCount: 2,
			payment: "http://google.com",
		},
		{
			id: 2,
			name: "Kumara Gamage",
			checkin: "2022-12-20",
			checkout: "2022-12-25",
			guests: 2,
			room: "Varenda Garden Room",
			roomCount: 1,
			payment: "http://facebook.com",
		}
	];

	const restaurentsData = [
		{
			id: 1,
			name: "Maduka Weerasinge",
			restaurent: "Sky Dine",
			date: "2022-12-23",
			tables: 2,
			meal: "Breakfast",
		},
		{
			id: 2,
			name: "Rashmi Wijesekara",
			restaurent: "Sky Dine",
			date: "2022-12-12",
			tables: 2,
			meal: "Dinner",
		},
		{
			id: 3,
			name: "Tharanga Silva",
			restaurent: "Chinese",
			date: "2022-12-23",
			tables: 1,
			meal: "Lunch",
		},
	];

	return (
		<>
			{tab === 1 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={pending} />
						<tbody className="">
							{pendingData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}

			{tab === 2 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={pending} />
						<tbody className="">
							{pendingData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}

			{tab === 3 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={pending} />
						<tbody className="">
							{pendingData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}

			{tab === 4 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={pending} />
						<tbody className="">
							{pendingData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}

			{tab === 5 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead tab={tab} columns={pending} />
						<tbody className="">
							{pendingData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}

			{tab === 6 && (
				<div className="max-w-[95%] mx-auto p-2 shadow-lg rounded-xl bg-white overflow-x-auto overflow-y-auto min-h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)]">
					<table className="min-w-full">
						<TableHead
							tab={tab}
							columns={restaurentsHead}
						/>
						<tbody className="">
							{restaurentsData.map((data) => (
								<TableBody tab={tab} data={data} />
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default TabsContent