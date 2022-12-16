import React from "react";

const TableBody = (props) => {
	console.log(props.data);

	return (
		<tr className="border-b border-opacity-20 border-gray-700 bg-white text-sm">
			{Object.keys(props.data).map((key, index) => {
				if (key !== "id") {
					if (key === "payment") {
						return (
							<td
								key={index}
								className="text-center text-bluebg underline underline-offset-4 py-2"
							>
								<a href={props.data[key]} target="_blank">
									image link
								</a>
							</td>
						);
					}

					return (
						<td key={index} className="text-center">
							{props.data[key]}
						</td>
					);
				}
			})}

			{props.tab === 1 && (
				<td className="text-center flex flex-row items-center justify-evenly py-2">
					<button className="text-white bg-green-600 px-4 rounded-full py-1">
						&#10004;
					</button>
					<button className="text-white font-sans font-extrabold bg-red-600 px-4 rounded-full py-1">
						x
					</button>
				</td>
			)}

			{props.tab === 2 && (
				<td className="text-center">
					<div className="bg-green-600 w-fit mx-auto px-2 py-1 text-white font-bold rounded-full text-xs">Approved</div>
				</td>
			)}
		</tr>
	);
};

export default TableBody;
