import React from 'react'

// icons
import {ReactComponent as CircleMark} from "../../assets/booking-progress/circle-mark.svg"
import {ReactComponent as LineMark} from "../../assets/booking-progress/line-mark.svg"

const ProgressTracker = () => {
	return (
		<div className="flex flex-row w-fit mx-auto">

			{/* date */}
			<div className="flex flex-row items-center">
				<CircleMark
					alt="circle"
					className="fill-blue-500"
				/>
				<LineMark alt="line" className="stroke-black" />
			</div>

			{/* reservation type */}
			<div className="flex flex-row items-center">
				<CircleMark
					alt="circle"
					className="fill-blue-500"
				/>
				<LineMark alt="line" className="stroke-black" />
			</div>

			{/* select item */}
			<div className="flex flex-row items-center">
				<CircleMark
					alt="circle"
					className="fill-blue-500"
				/>
				<LineMark alt="line" className="stroke-black" />
			</div>

			{/* summary */}
			<div className="flex flex-row items-center">
				<CircleMark
					alt="circle"
					className="fill-blue-500"
				/>
				<LineMark alt="line" className="stroke-black" />

				{/* payment */}
				<CircleMark
					alt="circle"
					className="fill-blue-500"
				/>
			</div>
		</div>
	);
}

export default ProgressTracker