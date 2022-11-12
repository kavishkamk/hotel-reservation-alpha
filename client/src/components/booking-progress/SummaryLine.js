import React from 'react'

const SummaryLine = (props) => {
	return (
		<div className="w-full flex flex-row font-poppins my-3">
			<div className="font-semibold">{props.topic}</div>
			<div className="ml-4">{props.item}</div>
		</div>
	);
}

export default SummaryLine