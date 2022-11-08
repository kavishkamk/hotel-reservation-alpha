import React, {useState, useEffect, useCallback} from 'react'

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import Dropdown from "../../components/booking-progress/Dropdown"

// data
import roomData from "../../data/rooms.json"
import tags from "../../data/tags.json"

const RoomSelect = (props) => {
	const [selected, setSelected] = useState([])
	const [loadOptions, setLoadOptions] = useState(false)

	// props
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;

	// useEffect(()=>{
	// 	console.log("inside parent")
	// 	console.log(selected)
	// },[selected])

	const backHandler = () => {
		setPage(page - 1);
	};

	const nextHandler = () => {
		setPage(page + 1);
	};

	const setSelectedHandler = useCallback((options)=> {
		setSelected(options)
		console.log("receivedddd")
		console.log(selected)
		// prevent re-rendering the dropdown component when click on search button
	}, [])

	return (
		<Container>
			<Topic topic="Select Room" />

			<div className="w-full">
				<Dropdown tags={tags} setSelectedHandler={setSelectedHandler} />
			</div>

			<div className="flex flex-row mt-auto">
				<BackButton onClick={backHandler} />

				<div className="ml-auto">
					<NextButton onClick={nextHandler} />
				</div>
			</div>
		</Container>
	);
}

export default RoomSelect