import React, {
	useState,
	useContext,
	useEffect,
} from "react";
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import CardContainer from "../../components/cards/CardContainer";
import SummaryLine from "../../components/booking-progress/SummaryLine";
import RoomBook__connection from "../../connections/RoomBook";
import RestaurentBook__connection from "../../connections/RestaurentBook";
import { DefaultContext } from "../../context/DefaultContext";

const Summary = (props) => {
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;
	const item = formData.item;

	const {
		setMessage_func,
		setMessageStatus_func,
		messageStatus,
	} = useContext(DefaultContext);
	const [bookStatus, setBookStatus] = useState(false);
	const [restaurentBookStatus, setRestaurentBookStatus] = useState(false);

	// hide previous section's popup message
	if (messageStatus && formData.type == 1) setMessageStatus_func();
	if(messageStatus && formData.type == 4 && !restaurentBookStatus) setMessageStatus_func();
	
	const backHandler = () => {
		setPage(page - 1);
	};

	const bookHandler = async () => {
		let res;

		if (formData.type == 1) {
			const details = {
				roomTypeId: formData.item.id,
				numberOfRooms: formData.rooms,
				numberOfPersons: formData.guests,
				fromDate: formData.checkin,
				toDate: formData.checkout,
			};

			res = await RoomBook__connection.roomBook(
				details
			);

			if (res.status) {
				await setBookStatus(true);
				await props.setFormData({
					...formData,
					bookStatus: true,
					orderId: res.orderId,
				});
				await setPage(page + 1);
			} 
		}
		else if(formData.type == 4) {
			const details = {
				restaurentTypeId: formData.item.id,
				numberOfTables: formData.Tables,
				numberOfPersons: formData.guests,
				fromDate: formData.date,
				meal: formData.meal[0].content
			}

			res = await RestaurentBook__connection.tableBook(details)

			if(res.status) {
				await setRestaurentBookStatus(true)
				await props.setFormData({
					...formData,
					restaurentBookStatus: true,
					orderId: res.orderId,
				});

				
			}
		}

		if(res.status === false) {
			setMessage_func(
				false,
				"Something went wrong! Could not reserved"
			);
			setMessageStatus_func();
		}
	};

	useEffect(()=> {
		if(restaurentBookStatus) {
			setMessage_func(
				true,
				"Tables are reserved successfully!"
			);
			setMessageStatus_func();
		}
	}, [restaurentBookStatus])

	const nextHandler = () => {
		if (formData.bookStatus) setPage(page + 1);
	};

	return (
		<div className="">
			<Container>
				<Topic topic="Booking Summary" />
				<div className="flex flex-col xl:flex-row justify-between my-5">
					<CardContainer
						title={item.name}
						image={item.image}
						description={item.description}
						item={item}
						hideBookBtn={true}
					/>
					<div className="w-full px-4 my-6 xl:my-0">
						{formData.checkin && (
							<SummaryLine
								topic={`Check-in Date : `}
								item={formData.checkin}
							/>
						)}
						{formData.checkout && (
							<SummaryLine
								topic={`Check-out Date : `}
								item={formData.checkout}
							/>
						)}
						{formData.date && (
							<SummaryLine
								topic={`Date : `}
								item={formData.date}
							/>
						)}
						<SummaryLine
							topic={`Guests : `}
							item={formData.guests}
						/>
						{formData.rooms && (
							<SummaryLine
								topic={`Rooms : `}
								item={formData.rooms}
							/>
						)}
						{formData.meal && (
							<SummaryLine
								topic={`Meal : `}
								item={formData.meal[0].content}
							/>
						)}
					</div>
				</div>

				<div className="flex flex-row mt-auto pt-5">
					{!props.backHide && (
						<BackButton onClick={backHandler} />
					)}

					<div className="ml-auto">
						{!formData.bookStatus ? (
							<NextButton
								onClick={bookHandler}
								name="Book Now"
							/>
						) : (
							<NextButton
								onClick={nextHandler}
								name="Next"
							/>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Summary;
