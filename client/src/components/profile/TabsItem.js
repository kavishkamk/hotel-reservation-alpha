import React from 'react'

const TabsItem = (props) => {
	const item = props.item
	const status = props.status
	const statusColor = props.statusColor
	
	return (
		<div onClick={props.onClick} className="hover:cursor-pointer flex flex-row items-center justify-between p-3 rounded-lg my-2 text-textBlue font-medium bg-[#E2E8F0]">
			<div className="w-full">
				{item.checkIn && (
					<div className="flex flex-row">
						<div className="w-1/3 font-bold">
							Check-in Date :
						</div>
						<div className="">{item.checkIn}</div>
					</div>
				)}
				{item.checkOut && (
					<div className="flex flex-row">
						<div className="w-1/3 font-bold">
							Check-out Date :
						</div>
						<div className="">{item.checkOut}</div>
					</div>
				)}
				{item.room && (
					<div className="flex flex-row">
						<div className="w-1/3 font-bold">
							Room Type :
						</div>
						<div className="">{item.room}</div>
					</div>
				)}
				{item.cost && (
					<div className="flex flex-row">
						<div className="w-1/3 font-bold">
							Total Cost :
						</div>
						<div className="">{`Rs.${item.cost}/=`}</div>
					</div>
				)}
				{item.date && (
					<div className="flex flex-row">
						<div className="w-1/3 font-bold">
							Reserved Date :
						</div>
						<div className="">{item.date}</div>
					</div>
				)}
				{item.restaurent && (
					<div className="flex flex-row">
						<div className="w-1/3 font-bold">
							Restaurent :
						</div>
						<div className="">{item.restaurent}</div>
					</div>
				)}
				{item.tables && (
					<div className="flex flex-row">
						<div className="w-1/3 font-bold">
							No. of Tables :
						</div>
						<div className="">{item.tables}</div>
					</div>
				)}
				{item.meal && (
					<div className="flex flex-row">
						<div className="w-1/3 font-bold">Meal :</div>
						<div className="">{item.meal}</div>
					</div>
				)}
			</div>
			{status && (
				<div
					className={
						"px-3 py-1 font-semibold rounded-md text-white whitespace-nowrap " +
						statusColor
					}
				>
					{status}
				</div>
			)}
		</div>
	);
}

export default TabsItem