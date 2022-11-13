import React from 'react'

const NavBtn = (props) => {
	return (
		<button
			onClick={props.onClick}
			className={`uppercase whitespace-nowrap text-xs lg:text-sm border border-[#6B71CB] bg-white w-fit px-3 py-2 font-poppins font-bold mx-3 ${props.rounded} hover:bg-[#6B71CB] hover:text-white hover:shadow-xl`}
		>
			{props.name}
		</button>
	);
}

export default NavBtn