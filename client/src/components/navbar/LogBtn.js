import React from 'react'

const LogBtn = (props) => {
	return (
		<button
			onClick={props.onClick}
			className="bg-[#4B51AC] text-white font-poppins font-bold px-4 mx-2 py-2 w-fit text-xs whitespace-nowrap lg:text-sm hover:shadow-xl hover:bg-blue-500"
		>
			{props.name}
		</button>
	);
}

export default LogBtn