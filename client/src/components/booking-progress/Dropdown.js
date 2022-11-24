import React, {useState, useEffect, memo} from 'react'
import { Selectable } from "@robertz65/lyte";

const Dropdown = memo((props) => {
  const SelectableOptions = props.tags
  const setSelectedHandler = props.setSelectedHandler;
  
  let allSelections = []

  const searchHandler = () => {
    setSelectedHandler(allSelections);
	};
  
	return (
		props.tags && (
			<div className="flex flex-row gap-5">
				<div className="w-[95%] mx-auto my-5 z-40">
					<Selectable
						width="100%"
						multi
						allowClear
						allowRefill
						options={SelectableOptions}
						defaultValue={allSelections.map(
							({ label }) => label
						)}
						onChange={(values) => {
							allSelections = values;
						}}
					/>
				</div>

				<button
					onClick={searchHandler}
					className="w-fit px-4 py-2 h-fit my-auto bg-[#10B981] rounded-xl text-white font-bold cursor-pointer hover:shadow-xl font-poppins"
				>
					Search
				</button>
			</div>
		)
	);
})

export default Dropdown