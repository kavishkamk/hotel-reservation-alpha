import React from "react";

const Navbtn = (props) => {
	return (
		<button
			onClick={props.onClick}
			className={
				`capitalize font-semibold font-poppins text-white px-6 py-2 ` +
				(props.path === props.currentPath ? `bg-[#FA7800]`: `bg-bluebg`)
			}
		>
			{props.name}
		</button>
	);
};

export default Navbtn;
