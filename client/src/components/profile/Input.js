import React from 'react'

const Input = (props) => {

	return (
		<div className="">
			<label
				htmlFor={props.id}
				className="text-sm text-textBlue"
			>
				{props.label}
			</label>
			<input
				id={props.id}
				type={props.type}
				defaultValue={props.defaultValue}
				placeholder={props.placeholder}
				readOnly={props.readonly}
				className={
					`w-full my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 ` +
						(props.type ===
					"email"
						? "text-gray-400"
						: "text-gray-900 ")
				}
			/>
		</div>
	);
}

export default Input