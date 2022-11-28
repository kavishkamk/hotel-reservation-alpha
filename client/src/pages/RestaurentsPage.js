import React, { useState, useEffect } from "react";

// components
import SelectDate from "../components/booking-progress/SelectDate";
import Search from "../components/rooms/Search";
import CardContainer from "../components/cards/CardContainer";

// data
import data from "../data/restaurents.json"

const RestaurentsPage = () => {
	const [formData, setFormData] = useState({
		type: "4",
		checkin: "",
		checkout: "",
		guests: "",
	});

	const [selectedTags, setSelectedTags] = useState([]);
	const [searchResult, setSearchResult] =
		useState(data);

	const tags = [
		{
			topic: "topic 1",
			tags: [
				{ label: 1, content: "Deluxe" },
				{ label: 2, content: "Executive" },
			],
		},
		{
			topic: "topic 2",
			tags: [
				{ label: 1, content: "Deluxe" },
				{ label: 2, content: "Executive" },
			],
		},
		{
			topic: "topic 3",
			tags: [
				{ label: 1, content: "Deluxe" },
				{ label: 2, content: "Executive" },
			],
		},
	];

	const searchHandler = () => {
		console.log(selectedTags);
		// parse the selected tags to the backend
	};

	return (
		<div className="relative top-16 bg-[#E2E8F0]">
			<div className="ml-10 font-poppins text-xl font-bold text-textBlue py-4">
				Restaurents
			</div>
			<div className="flex flex-col md:flex-row items-start">
				<Search
					tags={tags}
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
					onClick={() => searchHandler()}
				/>

				<div className="pl-5">
					<SelectDate
						formData={formData}
						setFormData={setFormData}
					/>

					<div className="flex flex-wrap justify-left gap-y-6 gap-x-2 mx-5 my-5">
						{searchResult.map((item) => (
							<CardContainer
								title={item.name}
								image={item.image}
								price={item.price}
								stars={item.stars}
								description={item.description}
								// bookClickHandler={bookClickHandler}
								item={item}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RestaurentsPage