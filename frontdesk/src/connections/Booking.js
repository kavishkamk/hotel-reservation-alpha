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

	async getPaymentSlip(id) {
		const thisUrl =
			main.url + "/payments/room-type/payment/" + id;
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();

		if(data.roomPayments) {
			let url = data.roomPayments.slipUrl.substring(8,)
			// console.log(url)
			return url

		}else {
			return "error"
		}
	}

	async getAllPending() {
		const thisUrl =
			main.url +
			"/booking/room-booking/awaiting-confirm-reservation";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		// console.log(data);
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
		// console.log(data);
		let result = {};

		if (data.reservationList) {
			result.data = data.reservationList;
		} else {
			result.error =
				"Something went wrong. Cannot retrieve the data";
		}

		return result;
	}

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
		// console.log(data);
		let result = {};

		if (data.reservationList) {
			result.data = data.reservationList;
		} else {
			result.error =
				"Something went wrong. Cannot retrieve the data";
		}
		return result;
	}

	async getAllRestaurentBookings() {
		const thisUrl =
			main.url + "/booking/restaurent-booking";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		// console.log(data);
		let result = {};

		if (data.bookings) {
			result.data = data.bookings;
		} else {
			result.error =
				"Something went wrong. Cannot retrieve the data";
		}
		return result;
	}

	async cancelBooking(id) {
		const thisUrl =
			main.url + "/booking/room-booking/cancel/"+ id;
		const token = Auth.getToken();

		// console.log(thisUrl)

		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		// console.log(data);
		let result;

		if (data.request === "success") {
			result = true;
		} else {
			result = false
		}
		return result;
	}
}

export default new Booking__connection();
