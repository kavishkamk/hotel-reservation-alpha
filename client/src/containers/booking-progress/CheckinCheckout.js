import React, {
	useEffect,
	useState,
	useContext,
} from "react";
import checkinImage from "../../assets/booking-progress/checkin.png";
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import SelectDate from "../../components/booking-progress/SelectDate";
import SelectMeal from "../../components/booking-progress/SelectMeal";
import { DefaultContext } from "../../context/DefaultContext";
import Rooms__connection from "../../connections/Rooms";
import Restaurents__connection from "../../connections/Restaurents";

const CheckinCheckout = (props) => {
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;

	const {
		setMessageStatus_func,
		setMessage_func,
		messageStatus,
	} = useContext(DefaultContext);

	const [selectStatus, setSelectStatus] = useState(false);
	const [
		restaurentSelectStatus,
		setRestaurentSelectStatus,
	] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const [
		searchResultRestaurents,
		setSearchResultRestaurents,
	] = useState([]);

	useEffect(() => {
		async function checkAvailabilityRooms(check) {
			const data =
				await Rooms__connection.checkAvailability(check);

			setSearchResult(data);
		}

		async function checkAvailabilityRestaurents(check) {
			const data =
				await Restaurents__connection.checkAvailability(
					check
				);
			setSearchResultRestaurents(data);
		}

		if (formData.type == 1) {
			if (
				formData.checkin.length > 0 &&
				formData.checkout.length > 0 &&
				formData.guests > 0 &&
				formData.rooms > 0
			) {
				const check = {
					checkin: formData.checkin,
					checkout: formData.checkout,
					guests: formData.guests,
					rooms: formData.rooms,
				};

				checkAvailabilityRooms(check);
				setSelectStatus(true);

				setMessage_func(true, "Availability checked! Go to the next step.");
				setMessageStatus_func()
			}
		} else if (formData.type == 4) {
			if (
				formData.date && 
				formData.date.length > 0 &&
				formData.guests > 0 &&
				formData.Tables > 0 &&
				formData.meal.length == 1
			) {
				const check = {
					date: formData.date,
					guests: formData.guests,
					tables: formData.Tables,
				};

				checkAvailabilityRestaurents(check);
				setRestaurentSelectStatus(true);

				setMessage_func(
					true,
					"Availability checked! Go to the next step."
				);
				setMessageStatus_func();
			}
		}
	}, [formData]);

	const backHandler = () => {
		setPage(page - 1);
	};

	const nextHandler = () => {
		if (formData.type == 1) {
			if (selectStatus && searchResult.length == 0) {
				setMessage_func(
					false,
					"Sorry! there are no any rooms available within the requested dates"
				);
				setMessageStatus_func();
			} else if (selectStatus && searchResult.length > 0) {
				setFormData({
					...formData,
					searchResultRooms: searchResult,
				});
				setPage(page + 1);
			} else {
				setMessage_func(
					false,
					"Please enter the relavent details!"
				);
				setMessageStatus_func();
			}
		} else if (formData.type == 4) {
			if (
				restaurentSelectStatus &&
				searchResultRestaurents.length == 0
			) {
				setMessage_func(
					false,
					"Sorry! there are no any tables available within the requested date and time"
				);
				setMessageStatus_func();
			} else if (
				restaurentSelectStatus &&
				searchResultRestaurents.length > 0
			) {
				setFormData({
					...formData,
					searchResultRestaurents: searchResultRestaurents,
				});
				setPage(page + 1);
			} else {
				setMessage_func(
					false,
					"Please enter the relavent details!"
				);
				setMessageStatus_func();
			}
		}
	};

	return (
		<Container>
			<Topic topic="Select Check-in / Check-out" />

			<div className="mx-auto md:w-[80%] lg:w-[50%]">
				<img src={checkinImage} alt="check-in" />
			</div>

			{formData.type == 1 ? (
				<div className="mx-auto">
					<SelectDate
						formData={formData}
						setFormData={setFormData}
					/>
				</div>
			) : (
				<div className="mx-auto">
					<SelectMeal
						formData={formData}
						setFormData={setFormData}
					/>
				</div>
			)}

			<div className="flex flex-row mt-auto">
				<BackButton onClick={backHandler} />

				<div className="ml-auto">
					<NextButton onClick={nextHandler} />
				</div>
			</div>
		</Container>
	);
};

export default CheckinCheckout;
