import React from 'react'

const Navbtn = (props) => {
	return (
		<button onClick={props.onClick} className="capitalize font-semibold font-poppins text-white bg-bluebg px-6 py-2">
			{props.name}
		</button>
	);
}

export default Navbtn