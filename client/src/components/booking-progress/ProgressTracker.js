import React from 'react'

// icons
import {ReactComponent as CircleMark} from "../../assets/booking-progress/circle-mark.svg"
import {ReactComponent as LineMark} from "../../assets/booking-progress/line-mark.svg"

const ProgressTracker = (props) => {
	const page = props.page

	return (
		<div className="flex flex-row w-fit mx-auto my-10">
			{/* date */}
			<div className="flex flex-row items-center">
				<CircleMark
					alt="circle"
					className={
						page >= 0 ? "fill-lightBlue" : "fill-textBlue"
					}
				/>
				<LineMark
					alt="line"
					className={
						page >= 0 ? "stroke-lightBlue" : "stroke-black"
					}
				/>
			</div>

			{/* reservation type */}
			<div className="flex flex-row items-center">
				<CircleMark
					alt="circle"
					className={
						page >= 1 ? "fill-lightBlue" : "fill-textBlue"
					}
				/>
				<LineMark
					alt="line"
					className={
						page >= 1 ? "stroke-lightBlue" : "stroke-black"
					}
				/>
			</div>

			{/* select item */}
			<div className="flex flex-row items-center">
				<CircleMark
					alt="circle"
					className={
						page >= 2 ? "fill-lightBlue" : "fill-textBlue"
					}
				/>
				<LineMark
					alt="line"
					className={
						page >= 2 ? "stroke-lightBlue" : "stroke-black"
					}
				/>
			</div>

			{/* summary */}
			<div className="flex flex-row items-center">
				<CircleMark
					alt="circle"
					className={
						page >= 3 ? "fill-lightBlue" : "fill-textBlue"
					}
				/>
				<LineMark
					alt="line"
					className={
						page >= 3 ? "stroke-lightBlue" : "stroke-black"
					}
				/>

				{/* payment */}
				<CircleMark
					alt="circle"
					className={
						page >= 4 ? "fill-lightBlue" : "fill-textBlue"
					}
				/>
			</div>
		</div>
	);
}

export default ProgressTracker