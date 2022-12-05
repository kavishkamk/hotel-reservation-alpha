import React, { useState, useEffect, memo } from "react";
import { Selectable } from "@robertz65/lyte";

const SingleDropdown = memo((props) => {
	const SelectableOptions = props.items
	const setSelected = props.setSelected

	const [option, setOption] = useState()

	let selection = []
	// if(props.meals !== null) selection = props.meals
	// else selection = []

	useEffect(()=> {
		if(option !== null){
			setSelected(option)
		}
		// if(selection.length >0){
		// 	setSelected(selection);
		// }
	}, [option])

	return (
		props.items && (
			<div className="">
				<div className="text-sm">
					<Selectable
						width="100%"
						options={SelectableOptions}
						defaultValue={selection.map(
							({ label }) => label
						)}
						onChange={(values) => {
							// selection = values;
							setOption(values)
							console.log(values)
							console.log(option)
							// setSelected(selection)
						}}
					/>
				</div>
			</div>
		)
	);
})

export default SingleDropdown