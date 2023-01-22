import React from 'react'
import {ReactComponent as CircleMark} from "../../assets/booking-progress/circle-mark.svg"
import {ReactComponent as LineMark} from "../../assets/booking-progress/line-mark.svg"

const ProgressTracker = (props) => {
	const page = props.page

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