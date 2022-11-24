import React, {useState, useEffect, useCallback} from 'react'

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import Dropdown from "../../components/booking-progress/Dropdown"
import CardContainer from "../../components/cards/CardContainer"

// data
import roomData from "../../data/rooms.json"
import tags from "../../data/tags.json"

const RoomSelect = (props) => {
	const [selected, setSelected] = useState([])
	const [loadOptions, setLoadOptions] = useState(false)
	const [searchResult, setSearchResult] = useState(roomData)

	// props
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;

	useEffect(() => {
		// *************************************
		// not working

		// selected.forEach((tag) => {
		// 	roomData.forEach((room) => {
		// 		room.tags.forEach((roomTag)=> {
		// 			if(tag === roomTag){
		// 				setSearchResult(searchResult =>[...searchResult, room])
		// 			}
		// 		})
		// 	})
		// });
		if(selected.length > 0){
			setSearchResult([roomData[0], roomData[1]])
			console.log(searchResult)
		}
	}, [selected])
	

	const backHandler = () => {
		setPage(page - 1);
	};

	const nextHandler = () => {
		setPage(page + 1);
	};

	const setSelectedHandler = useCallback(async(options)=> {
		await setSelected(options)
		// prevent re-rendering the dropdown component when click on search button
	}, [])

	const bookClickHandler = (item) => {
		setFormData({ ...formData, item: item });
		setPage(page + 1);
	};

	return (
		<Container>
			<Topic topic="Select Room" />

			<div className="w-full">
				<Dropdown
					tags={tags}
					setSelectedHandler={setSelectedHandler}
				/>
			</div>

			<div className="flex flex-wrap w-full justify-evenly gap-y-6 my-10">
				{searchResult.map((item) => (
					<CardContainer
						title={item.name}
						image={item.image}
						price={item.price}
						stars={item.stars}
						description={item.description}
						bookClickHandler={bookClickHandler}
						item={item}
					/>
				))}
			</div>

			<div className="flex flex-row mt-auto">
				<BackButton onClick={backHandler} />

				{/* <div className="ml-auto">
					<NextButton onClick={nextHandler} />
				</div> */}
			</div>
		</Container>
	);
}

export default RoomSelect