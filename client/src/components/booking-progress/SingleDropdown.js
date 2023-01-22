import React, { useState, useEffect, memo } from "react";
import { Selectable } from "@robertz65/lyte";

const SingleDropdown = memo((props) => {
	const SelectableOptions = props.items
	const setSelected = props.setSelected

	const [option, setOption] = useState()
	let selection = []

	useEffect(()=> {
		if(option !== null){
			setSelected(option)
		}
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
							setOption(values)
						}}
					/>
				</div>
			</div>
		)
	);
})

export default SingleDropdown