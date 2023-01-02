import * as main from "./main-url";
import Auth from "../functions/Auth";

class Booking__connection {

	async getRoomById(id) {
		const thisUrl = main.url + "/services/rooms/"+ id;
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
		
		if(data.room) {
			result.room = data.room.roomType;
		}else {
			result.error = "Cannot retrieve Room Name"
		}
		return result
	}

	async getAllPending() {
		const thisUrl =
			main.url +
			"/booking/room-booking/pending-reservation";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		console.log(data);
		let result = {}

		if(data.reservationList) {
			result.data = data.reservationList
		}else {
			result.error = "Something went wrong. Cannot retrieve the data"
		}

		return result
	}

	async getAllApproved() {
		const thisUrl =
			main.url + "/booking/room-booking/confirmed";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		console.log(data);
		let result = {};

		if (data.reservationList) {
			result.data = data.reservationList;
		} else {
			result.error =
				"Something went wrong. Cannot retrieve the data";
		}

		return result;
	}

	async getAllCheckin() {
		const thisUrl =
			main.url + "/booking/room-booking/confirmed";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		console.log(data);
		let result = {};

		if (data.reservationList) {
			result.data = data.reservationList;
		} else {
			result.error =
				"Something went wrong. Cannot retrieve the data";
		}

		return result;
	}

	async getAllCheckout() {}

	async getAllCancelled() {
		const thisUrl =
			main.url + "/booking/room-booking/cancelled";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		console.log(data);
		let result = {};

		if (data.reservationList) {
			result.data = data.reservationList;
		} else {
			result.error =
				"Something went wrong. Cannot retrieve the data";
		}
		return result;
	}

	async getAllRestaurentBookings() {}
}

export default new Booking__connection();
