import * as main from "./main-url";
import Auth from "../functions/Auth";

class Checkin__connection {
	async getBookingSummary(id) {
		// return all the bookings yet to checkin of given client id
		const thisUrl =
			main.url +
			"/booking/room-booking/confirmed/user/" +
			id;
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		let result = {}

		if(data.reservationList){
			const newData = data.reservationList
				.map((item) => {
					if (item.arrivalStatus === "Pending") {
						return item;
					}
				})
				.filter(
					(notUndefined) => notUndefined !== undefined
				);

			result.data = newData
		}else {
			result.error = "Something went wrong with the reservation list"
		}

		return result;
	}

	async setCheckin(id) {
		const thisUrl =
			main.url + "/booking/room-booking/checkIn/" + id;
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();

		let result = {};

		if(data.errorType) {
			result.error = "Something went wrong. Try again!"
		}else if(data.order) {
			result.status = true
		}
		return result
	}
}

export default new Checkin__connection();