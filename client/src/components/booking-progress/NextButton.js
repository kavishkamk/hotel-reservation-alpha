import React from 'react'

const NextButton = (props) => {
	return (
		<div onClick={props.onClick} className="cursor-pointer hover:shadow-xl font-poppins bg-[#10B981] text-white font-semibold w-fit px-3 py-2">
			{props.name ? props.name :"Next >"}
		</div>
	);
}

export default NextButton