import React from 'react'

const InputField = (props) => {
	const handleInputChange = (event) => {
		props.setInput(event.target.value);
	};

	let readonly = false
	if(props.value) readonly = true

	return (
		<div className="flex flex-row items-center justify-between">
			<label
				for={props.id}
				className="text-sm font-semibold text-black"
			>
				{props.title}
			</label>
			{props.input ? (
				<input
					id={props.id}
					type={props.type}
					placeholder={props.title}
					value={props.input}
					onChange={handleInputChange}
					readOnly={readonly}
					className="w-2/3 my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900 bg-[#E2E8F0]"
				/>
			) : (
				<input
					id={props.id}
					type={props.type}
					placeholder={props.title}
					value={props.value}
					readOnly={readonly}
					onChange={handleInputChange}
					className="w-2/3 my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900 bg-[#E2E8F0]"
				/>
			)}
		</div>
	);
}

export default InputField