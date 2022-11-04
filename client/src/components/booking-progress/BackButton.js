import React from 'react'

const BackButton = (props) => {
	return (
		<div
			onClick={props.onClick}
			className="cursor-pointer hover:shadow-xl font-poppins bg-[#4B51AC] text-white font-semibold w-fit px-3 py-2"
		>
			{"< Back"}
		</div>
	);
}

export default BackButton