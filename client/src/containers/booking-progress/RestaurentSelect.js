import React, {
	useState,
	useEffect,
	useCallback,
} from "react";
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import Dropdown from "../../components/booking-progress/Dropdown";
import CardContainer from "../../components/cards/CardContainer";
import restaurentsData from "../../data/restaurents.json";
import Restaurents__connection from "../../connections/Restaurents"

const RestaurentSelect = (props) => {
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;

	const [selected, setSelected] = useState([]);
	const [loadOptions, setLoadOptions] = useState(false);
	const [searchResult, setSearchResult] = useState(formData.searchResultRestaurents);
	const [tags, setTags] = useState([]);

	useEffect(()=> {
		async function getAllTags() {
			const data =
				await Restaurents__connection.getAllTags();
			await setTags(data);
		}

		getAllTags()
	}, [])

	useEffect(()=> {
		async function loadRooms() {
			let selectedTags = [];
			selected.forEach((tag) => {
				selectedTags.push(tag.id);
			});

			const data =
				await Restaurents__connection.filterRestaurents(
					selectedTags
				);
			setSearchResult(data);
		}
		if (selected.length > 0) {
			loadRooms();
		}
	}, [selected])

	const backHandler = () => {
		setPage(page - 1);
	};

	const nextHandler = () => {
		setPage(page + 1);
	};

	const setSelectedHandler = useCallback(
		async (options) => {
			await setSelected(options);
			// prevent re-rendering the dropdown component when click on search button
		},
		[]
	);

	const bookClickHandler = (item)=> {
		setFormData({...formData, item:item})
		setPage(page + 1);
	}

	return (
		<Container>
			<Topic topic="Select Restaurent" />

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
						description={item.description}
						bookClickHandler={bookClickHandler}
						item={item}
						stars={item.stars}
					/>
				))}
			</div>

			<div className="flex flex-row mt-auto">
				<BackButton onClick={backHandler} />
			</div>
		</Container>
	);
};

export default RestaurentSelect;
