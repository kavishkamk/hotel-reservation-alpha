import React, {
	useEffect,
	useState,
	useContext,
} from "react";
import Profile__connection from "../connections/Profile";
import ProfileEdit from "../components/profile/ProfileEdit";
import Bookings from "../components/profile/Bookings";
import Topic from "../components/booking-progress/Topic";
import Auth from "../functions/Auth";
import { DefaultContext } from "../context/DefaultContext";

const ProfilePage = () => {
	const [user, setUser] = useState();
	const [edited, setEdited] = useState(false);
	const [editedUser, setEditedUser] = useState({});

	const { setMessage_func, setMessageStatus_func } =
		useContext(DefaultContext);

	useEffect(() => {
		async function fetchData() {
			const data = await Profile__connection.getUserData();
			return data;
		}
		const data = fetchData();

		// getting user data from the session storage
		const user = Auth.getUser();
		setUser(user);
	}, []);

	useEffect(() => {
		async function fetchData(setuser) {
			const data = await Profile__connection.editUser(
				setuser
			);
			await setEditedUser(data)
			return data;
		}

		if (edited === true) {
			// send edited user data
			const data = fetchData(user);	
		}
	}, [edited]);

	useEffect(()=> {
		if (editedUser.user) {
			const newUser = Auth.getUser();
			setUser(newUser);

			setMessage_func(
				true,
				"Successfully updated the details."
			);
			setMessageStatus_func();
		} 
		else if (editedUser.error) {
			setMessage_func(false, editedUser.error);
			setMessageStatus_func();
		}
	}, [editedUser])

	return (
		user && (
			<div className="relative top-16 bg-[#E2E8F0] py-10 px-2 md:pl-10 min-h-[calc(100vh-10rem)]">
				<Topic topic="Profile Details" />
				<div className="flex flex-col md:flex-row items-start md:justify-evenly">
					<ProfileEdit
						user={user}
						setUser={setUser}
						setEdited={setEdited}
					/>
					<Bookings />
				</div>
			</div>
		)
	);
};

export default ProfilePage;
