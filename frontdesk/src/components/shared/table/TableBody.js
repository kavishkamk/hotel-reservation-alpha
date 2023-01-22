import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import Booking__connection from "../../../connections/Booking";
import { DefaultContext } from "../../../context/DefaultContext";

const TableBody = (props) => {
	const [cancelBookStatus, setCancelBookStatus] =
		useState(false);
	const [approveBookStatus, setApproveBookStatus] = useState(false);
	const [cancelBookId, setCancelBookId] = useState("");
	const [approveBookId, setApproveBookId] = useState("")

	const {
		setMessage_func,
		setMessageStatus_func,
		setSureModalDisplay_func,
		setSure_func,
		setSureStatus_func,
		setSureVerify_func,
		sureVerify,
	} = useContext(DefaultContext);

	const cancelBookHandler = async (id) => {
		await setCancelBookId(id);
		await setSureModalDisplay_func(true);
		await setSure_func(
			"Confirm the cancellation of this reservation",
			"Confirm"
		);
		await setSureStatus_func();

		await setCancelBookStatus(true);
	};

	const approveBookHandler = async (id) => {
		await setApproveBookId(id)
		await setSureModalDisplay_func(true);
		await setSure_func(
			"Confirm the approval of this reservation",
			"Confirm"
		);
		await setSureStatus_func();
		await setApproveBookStatus(true)
	}

	useEffect(() => {
		async function cancelBooking(id) {
			const result =
				await Booking__connection.cancelBooking(id);
			if (result) {
				await setMessage_func(
					true,
					"Reservation Cancelled"
				);
				await setMessageStatus_func();

				// reload the table
				props.setDeleteLine(id, 5)
			} else {
				await setMessage_func(
					false,
					"Reservation couldn't cancel"
				);
				await setMessageStatus_func();
			}

			await setCancelBookId("");
		}

		async function approveBooking(id) {
			const result =
				await Booking__connection.approveBooking(id);
			if (result) {
				await setMessage_func(
					true,
					"Reservation Approved"
				);
				await setMessageStatus_func();

				// reload the table
				props.setDeleteLine(id, 2);
			} else {
				await setMessage_func(
					false,
					"Reservation couldn't approve"
				);
				await setMessageStatus_func();
			}

			await setApproveBookId("");
		}

		if(sureVerify === true && cancelBookStatus === true) {
			cancelBooking(cancelBookId)
			setSureVerify_func(false);
			setCancelBookStatus(false)
		}else if(sureVerify === true && approveBookStatus === true) {
			approveBooking(approveBookId)
			setSureVerify_func(false)
			setApproveBookStatus(false)
		}
	}, [sureVerify, cancelBookStatus, approveBookStatus]);

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
						<button
							onClick={() =>
								approveBookHandler(props.data.id)
							}
							className="text-white bg-green-600 px-4 rounded-full py-1"
						>
							&#10004;
						</button>
					)}
					<button
						onClick={() => cancelBookHandler(props.data.id)}
						className="text-white font-sans font-extrabold bg-red-600 px-4 rounded-full py-1"
					>
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
