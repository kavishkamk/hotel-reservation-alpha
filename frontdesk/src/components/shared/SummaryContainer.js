import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Input from "../dashboard/InputField";

const SummaryContainer = (props) => {
	console.log(props.item)

	const [order, setOrder] = useState(props.item)
	const paidHandler = () => {
		console.log("should print")
		// sessionStorage.setItem(
		// 	"loginStatus", true
		// );
		window.open("/print", "_blank", 'height=full')
		// window.print();
	};

	const checkinHandler = () => {};

	const checkoutHandler = () => {};

	useEffect(()=> {
		if(props.item){
			console.log(props.item)
			setOrder(props.item)
		}
	}, [props.item])

	return (
		<div className="bg-white drop-shadow-2xl rounded-xl p-3 text-xs">
			<Input
				title="Room Type"
				id="roomtype"
				type="text"
				value={order.room}
			/>
			<Input
				title="Check-in"
				id="checkin"
				type="text"
				value={order.checkin}
			/>
			<Input
				title="Check-out"
				id="checkout"
				type="text"
				value={order.checkout}
			/>
			<Input
				title="No. of Guests"
				id="guests"
				type="number"
				value={order.guests}
			/>
			<Input
				title="No. of Rooms"
				id="roomCount"
				type="number"
				value={order.roomCount}
			/>
			<Input
				title="Price"
				id="price"
				type="text"
				value={order.price}
			/>

			{!props.checkout && (
				<div className="flex flex-row items-center justify-evenly my-3">
					{/* <Link
						to="/print"
						// state={{data: order}}
						target="_blank"
						rel="noopener noreferrer"
					> */}
						<button
							onClick={paidHandler}
							className="bg-textBlue text-white font-bold text-base px-6 py-1"
						>
							Paid
						</button>
					{/* </Link> */}
					<button
						onClick={checkinHandler}
						className="bg-textBlue text-white font-bold text-base px-6 py-1"
					>
						Check-in
					</button>
				</div>
			)}

			{props.checkout && (
				<div className="flex flex-row items-center justify-evenly my-3">
					<button
						onClick={checkoutHandler}
						className="bg-textBlue text-white font-bold text-base px-6 py-1"
					>
						Check-out
					</button>
				</div>
			)}
		</div>
	);
};

export default SummaryContainer;
