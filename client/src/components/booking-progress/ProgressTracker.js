import React from 'react'

// icons
import {ReactComponent as CircleMark} from "../../assets/booking-progress/circle-mark.svg"
import {ReactComponent as LineMark} from "../../assets/booking-progress/line-mark.svg"

const ProgressTracker = (props) => {
	const page = props.page

	// return (
	// 	<div className="w-fit mx-auto my-10">
	// 		<div className="flex flex-row">
	// 			{/* reservation type */}
	// 			<div className="flex flex-row items-center md:w-full">
	// 				<CircleMark
	// 					alt="circle"
	// 					className={
	// 						page >= 0 ? "fill-lightBlue" : "fill-textBlue"
	// 					}
	// 				/>
	// 				<LineMark
	// 					alt="line"
	// 					className={
	// 						page >= 1
	// 							? "stroke-lightBlue"
	// 							: "stroke-black"
	// 					}
	// 				/>
	// 			</div>

	// 			{/* date */}
	// 			<div className="flex flex-row items-center">
	// 				<CircleMark
	// 					alt="circle"
	// 					className={
	// 						page >= 1 ? "fill-lightBlue" : "fill-textBlue"
	// 					}
	// 				/>
	// 				<LineMark
	// 					alt="line"
	// 					className={
	// 						page >= 2
	// 							? "stroke-lightBlue"
	// 							: "stroke-black"
	// 					}
	// 				/>
	// 			</div>

	// 			{/* select item */}
	// 			<div className="flex flex-row items-center">
	// 				<CircleMark
	// 					alt="circle"
	// 					className={
	// 						page >= 2 ? "fill-lightBlue" : "fill-textBlue"
	// 					}
	// 				/>
	// 				<LineMark
	// 					alt="line"
	// 					className={
	// 						page >= 3
	// 							? "stroke-lightBlue"
	// 							: "stroke-black"
	// 					}
	// 				/>
	// 			</div>

	// 			{/* summary */}
	// 			<div className="flex flex-row items-center">
	// 				<CircleMark
	// 					alt="circle"
	// 					className={
	// 						page >= 3 ? "fill-lightBlue" : "fill-textBlue"
	// 					}
	// 				/>
	// 				<LineMark
	// 					alt="line"
	// 					className={
	// 						page >= 4
	// 							? "stroke-lightBlue"
	// 							: "stroke-black"
	// 					}
	// 				/>

	// 				{/* payment */}
	// 				<CircleMark
	// 					alt="circle"
	// 					className={
	// 						page >= 4 ? "fill-lightBlue" : "fill-textBlue"
	// 					}
	// 				/>
	// 			</div>
	// 		</div>

	// 		<div className="flex flex-row w-full mx-auto gap-10">
	// 			<div className="w-40 font-poppins text-center uppercase">Reservation Type</div>
	// 			<div className="w-40 font-poppins text-center uppercase">Date</div>
	// 			<div className="w-40 font-poppins text-center uppercase">Select Item</div>
	// 			<div className="w-40 font-poppins text-center uppercase">Summary</div>
	// 			<div className="w-40 font-poppins text-center uppercase">Payment</div>
	// 		</div>
	// 	</div>
	// );

	return (
		<div className="progress-bar mx-auto my-10 w-[90%] md:w-[60%] lg:w-[50%]">
			<div
				style={{
					width:
						page === 0
							? "20%"
							: page === 1
							? "40%"
							: page === 2
							? "60%"
							: page === 3
							? "80%"
							: "100%",
				}}
			></div>
		</div>
	);
}

export default ProgressTracker