import React from 'react'

import ProfileEdit from "../components/profile/ProfileEdit"
import Bookings from "../components/profile/Bookings"
import Topic from "../components/booking-progress/Topic"

const ProfilePage = () => {
	return (
		<div className="relative top-16 bg-[#E2E8F0] py-10 px-2 md:pl-10 min-h-[calc(100vh-10rem)]">
			<Topic topic="Profile Details" />
			<div className="flex flex-col md:flex-row items-start md:justify-evenly">
				<ProfileEdit />
				<Bookings />
			</div>
		</div>
	);
}

export default ProfilePage