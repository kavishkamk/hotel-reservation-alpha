import React, {
	useState,
	useEffect,
	useCallback,
} from "react";

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import Dropdown from "../../components/booking-progress/Dropdown";
import CardContainer from "../../components/cards/CardContainer";

// data
import packagesData from "../../data/packages.json";
import tags from "../../data/package-tags.json";

const PackageSelect = (props) => {
	const [selected, setSelected] = useState([]);
	const [loadOptions, setLoadOptions] = useState(false);
	const [searchResult, setSearchResult] = useState(packagesData);

	// props
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;

	useEffect(()=> {
		if (selected.length > 0) {
			setSearchResult([packagesData[0], packagesData[1]]);
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

	return (
		<Container>
			<Topic topic="Select Package" />

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
						description={item.description}
					/>
				))}
			</div>

			<div className="flex flex-row mt-auto">
				<BackButton onClick={backHandler} />

				<div className="ml-auto">
					<NextButton onClick={nextHandler} />
				</div>
			</div>
		</Container>
	);
};

export default PackageSelect;
