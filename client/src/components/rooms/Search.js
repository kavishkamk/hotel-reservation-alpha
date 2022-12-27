import React from "react";
import SelectTags from "./SelectTags";

const Search = (props) => {
	const tags = props.tags;
	const setSelectedTags = props.setSelectedTags;
	const selectedTags = props.selectedTags;

	return (
		<div className="flex flex-col w-full md:w-1/2 lg:w-[20%] items-left md:ml-5 p-5 my-5 rounded-xl bg-white shadow-lg">
			{
				<SelectTags
					tags={tags}
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
				/>
			}
			<button
				onClick={props.onClick}
				className="w-fit bg-[#4B51AC] text-white font-poppins font-bold px-4 py-1"
			>
				Search
			</button>
		</div>
	);
};

export default Search;
