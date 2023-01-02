import React from "react";

const TableBody = (props) => {
	// console.log(props.data);

	return (
		<tr className="border-b border-opacity-20 border-gray-700 bg-white text-sm">
			{Object.keys(props.data).map((key, index) => {
				if (key !== "id") {
					if (key === "payment") {
						if (props.data[key] == "") {
							return (
								<td
									key={index}
									className="text-center text-slate-500 border-x"
								>
									None
								</td>
							);
						} else {
							return (
								<td
									key={index}
									className="text-center text-bluebg underline underline-offset-4 border-x"
								>
									<a href={props.data[key]} target="_blank">
										image link
									</a>
								</td>
							);
						}
					}

					return (
						<td
							key={index}
							className={
								(key === "name" || key === "room"
									? "text-left pl-2"
									: "text-center") + " border-x py-2"
							}
						>
							{props.data[key]}
						</td>
					);
				}
			})}

			{props.tab === 1 && (
				<td className="text-center flex flex-row items-center justify-evenly py-2 border-x">
					{/* cannot approve until get a payment slip */}
					{props.data["payment"] !== "" && (
						<button className="text-white bg-green-600 px-4 rounded-full py-1">
							&#10004;
						</button>
					)}
					<button className="text-white font-sans font-extrabold bg-red-600 px-4 rounded-full py-1">
						x
					</button>
				</td>
			)}

			{props.tab === 2 && (
				<td className="text-center border-x">
					<div className="bg-green-400 w-fit mx-auto px-2 py-1 text-white font-bold rounded-full text-xs">
						Approved
					</div>
				</td>
			)}

			{props.tab === 3 && (
				<td className="text-center border-x">
					<div className="bg-blue-400 w-fit mx-auto px-2 py-1 text-white font-bold rounded-full text-xs">
						Check-in
					</div>
				</td>
			)}

			{props.tab === 4 && (
				<td className="text-center border-x">
					<div className="bg-orange-300 w-fit mx-auto px-2 py-1 text-white font-bold rounded-full text-xs">
						Check-out
					</div>
				</td>
			)}

			{props.tab === 5 && (
				<td className="text-center border-x">
					<div className="bg-red-400 w-fit mx-auto px-2 py-1 text-white font-bold rounded-full text-xs">
						Cancelled
					</div>
				</td>
			)}
		</tr>
	);
};

export default TableBody;
