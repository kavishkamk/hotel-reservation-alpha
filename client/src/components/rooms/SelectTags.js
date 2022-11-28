import React,{useState} from 'react'

const SelectTags = (props) => {
	const tags = props.tags
	const setSelectedTags = props.setSelectedTags
	const selectedTags = props.selectedTags

	const [checkedState, setCheckedState] = useState(
		new Array(tags.length).fill(false)
	);

	const handleOnChange = (position, name) => {
		const updatedCheckedState = checkedState.map(
			(item, index) => (index === position ? !item : item)
		);

		setCheckedState(updatedCheckedState);
		setSelectedTags([...selectedTags, name])
	};

	return (
		<div className="font-poppins text-textBlue font-light text-sm mb-4">
			<ul className="">
				{tags.map((item) => {
					return (
						<li key={item.label}>
							<div className="">
								<div className="">
									<input
										type="checkbox"
										className="mx-2 my-2"
										id={`custom-checkbox-${item.label}`}
										name={item.content}
										value={item.content}
										checked={checkedState[item.label]}
										onChange={() =>
											handleOnChange(item.label, item.content)
										}
									/>
									<label
										htmlFor={`custom-checkbox-${item.label}`}
									>
										{item.content}
									</label>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default SelectTags