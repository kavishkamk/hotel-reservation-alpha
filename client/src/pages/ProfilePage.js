import React, {useEffect, useState} from 'react'
import Profile__connection from "../connections/Profile"
import ProfileEdit from "../components/profile/ProfileEdit"
import Bookings from "../components/profile/Bookings"
import Topic from "../components/booking-progress/Topic"
import Auth from "../functions/Auth"

const ProfilePage = () => {
	const [user, setUser] = useState()

	useEffect(()=> {
		async function fetchData() {
			const data = await Profile__connection.getUserData()
			return data
		}
		const data = fetchData()
		console.log(data)

		// getting user data from the session storage
		const user = Auth.getUser()
		setUser(user)
	}, [])

	useEffect(()=> {
		console.log(user)
	}, [user])

	return user &&(
		<div className="relative top-16 bg-[#E2E8F0] py-10 px-2 md:pl-10 min-h-[calc(100vh-10rem)]">
			<Topic topic="Profile Details" />
			<div className="flex flex-col md:flex-row items-start md:justify-evenly">
				<ProfileEdit user={user} setUser={setUser} />
				<Bookings />
			</div>
		</div>
	);
}

export default ProfilePage