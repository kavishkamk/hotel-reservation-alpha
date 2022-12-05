import React from 'react'

import SelectTags from "./SelectTags"

const Search = (props) => {
	const tags = props.tags
	const setSelectedTags = props.setSelectedTags
	const selectedTags = props.selectedTags

	return (
		<div className="flex flex-col w-full md:w-1/2 lg:w-1/4 items-left md:ml-5 p-5 my-5 rounded-xl bg-white shadow-lg">
		{tags.map((item) => (
				<div className="w-full">
					<div key={item.topic} className="text-textBlue font-poppins font-semibold">
						{item.topic}
					</div>
					<div className="">
						{
							<SelectTags
								tags={item.tags}
								selectedTags={selectedTags}
								setSelectedTags={setSelectedTags}
							/>
						}
					</div>
				</div>
			))}

			<button onClick={props.onClick} className="w-fit bg-[#4B51AC] text-white font-poppins font-bold px-4 py-1">
				Search
			</button></div>
	)
}

export default Search