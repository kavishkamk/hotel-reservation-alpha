import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Rooms__connection from "../connections/Rooms";
import SelectDate from "../components/booking-progress/SelectDate";
import Search from "../components/rooms/Search";
import CardContainer from "../components/cards/CardContainer";
import {DefaultContext} from "../context/DefaultContext"

const RoomsPage = () => {
	const [formData, setFormData] = useState({
		type: "1",
		checkin: "",
		checkout: "",
		guests: "",
		rooms: 0,
	});

	const [selectedTags, setSelectedTags] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const [bookStatus, setBookStatus] = useState(false);
	const [item, setItem] = useState([]);
	const [tags, setTags] = useState([]);
	const [bookHide, setBookHide] = useState(true);

	const {
		setMessage_func,
		setMessageStatus_func
	} = useContext(DefaultContext);

	const searchHandler = async () => {
		const data = await Rooms__connection.filterRooms(
			selectedTags
		);
		setSearchResult(data);
	};

	let redirect;
	const bookClickHandler = (item) => {
		setItem(item);
		setFormData({ ...formData, item });
		setBookStatus(true);
	};

	useEffect(() => {
		async function checkAvailability(check) {
			const data = await Rooms__connection.checkAvailability(check)

			setBookHide(false);
			setMessage_func(true, "Available Room List updated!")
			setMessageStatus_func();
		}

		if (
			formData.checkin.length > 0 &&
			formData.checkout.length > 0 &&
			formData.guests.length > 0 &&
			formData.rooms > 0
		) {
			const check = {
				checkin: formData.checkin,
				checkout: formData.checkout,
				guests: formData.guests,
				rooms: formData.rooms
			}

			checkAvailability(check)
		}
	}, [formData]);

	useEffect(() => {
		async function getAllRoomsTags() {
			const data =
				await Rooms__connection.getAllRoomsTags();
			await setTags(data);
		}

		async function getAllRooms() {
			const data = await Rooms__connection.getAllRooms();
			await setSearchResult(data);
		}

		getAllRoomsTags();
		getAllRooms();
	}, []);

	return (
		<>
			{bookStatus && (
				<Navigate
					to="/booking-process"
					state={{
						page: 3,
						formData: formData,
						backHide: true,
					}}
					replace={false}
				/>
			)}
			<div className="relative top-16 bg-[#E2E8F0] min-h-[calc(100vh-10rem)]">
				<div className="ml-10 font-poppins text-xl font-bold text-textBlue py-4">
					Rooms
				</div>
				<div className="flex flex-col md:flex-row items-start">
					<Search
						tags={tags}
						selectedTags={selectedTags}
						setSelectedTags={setSelectedTags}
						onClick={() => searchHandler()}
					/>

					<div className="md:ml-5">
						<SelectDate
							formData={formData}
							setFormData={setFormData}
						/>

						<div className="flex flex-wrap justify-left gap-y-6 gap-x-2 my-5">
							{searchResult.map((item) => (
								<CardContainer
									title={item.name}
									image={item.image}
									price={item.price}
									stars={item.stars}
									description={item.description}
									bookClickHandler={bookClickHandler}
									item={item}
									hideBookBtn={bookHide}
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
