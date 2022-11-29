import React, { useState, useEffect } from "react";

// components
import SelectDate from "../components/booking-progress/SelectDate";
import Search from "../components/rooms/Search";
import CardContainer from "../components/cards/CardContainer";

// data
import roomData from "../data/rooms.json";

const RoomsPage = () => {
	const [formData, setFormData] = useState({
		type: "1",
		checkin: "",
		checkout: "",
		guests: "",
	});

	const [selectedTags, setSelectedTags] = useState([]);
	const [searchResult, setSearchResult] =
		useState(roomData);

	const roomsTags = [
		{
			topic: "Room Class",
			tags: [
				{ label: 1, content: "Deluxe" },
				{ label: 2, content: "Executive" },
			],
		},
		{
			topic: "Bedding",
			tags: [
				{ label: 1, content: "Queen" },
				{ label: 2, content: "King" },
			],
		},
		{
			topic: "Facilities",
			tags: [
				{ label: 1, content: "AC" },
				{ label: 2, content: "Suite" },
			],
		},
	];

	const searchHandler = () => {
		console.log(selectedTags);
		// parse the selected tags to the backend
	};

	const viewMoreHandler = ()=> {

	}

	return (
		<>
			<div className="relative top-16 bg-[#E2E8F0]">
				<div className="ml-10 font-poppins text-xl font-bold text-textBlue py-4">
					Rooms
				</div>
				<div className="flex flex-col md:flex-row items-start">
					<Search
						tags={roomsTags}
						selectedTags={selectedTags}
						setSelectedTags={setSelectedTags}
						onClick={() => searchHandler()}
					/>

					<div className="">
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
									viewMoreHandler={viewMoreHandler}
									item={item}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			
		</>
	);
};

export default RoomsPage;
