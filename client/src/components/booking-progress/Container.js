import React from 'react'

const Container = (props) => {
	return (
		<div className="bg-white font-manrope border border-black rounded-xl w-[90%] md:w-[60%] md:min-h-[500px] mx-auto py-5 px-10 flex flex-col">
			{props.children}
		</div>
	)
}

export default Container