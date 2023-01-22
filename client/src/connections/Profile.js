import * as main from "./main-url";
import Auth from "../functions/Auth";

class Profile__connection {
	async getUserData() {
		const thisUrl = main.url + "/users/currentuser";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();
		let value = {};

		if (data.currentUser != null) {
			value = data.currentUser;
		}
		return value;
	}

	async editUser(user) {
		const thisUrl = main.url + "/users/editprofile";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				firstName: user.firstName,
				lastName: user.lastName,
				address: user.address,
				contactNumber: user.contactNumber,
			}),
		});

		const data = await res.json();
		let value = {};

		if (data.user) {
			value.user = data.user;
			Auth.saveUser(data.user);
		} else {
			value.error =
				"Something went wrong. Please try again later";
		}

		return value;
	}

	async bookingRecords() {
		const thisUrl =
			main.url +
			"/booking/room-booking/pending-reservation/current-user";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();
		let result = {};
		if (data.reservationList) {
			result.data = data.reservationList;
		} else {
			result.error =
				"Something went wrong. Please try again later";
		}

		return result;
	}

	async cancelledRecords() {
		const thisUrl =
			main.url +
			"/booking/room-booking/cancelled/current-user";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();
		let result = {};
		if (data.reservationList) {
			result.data = data.reservationList;
		} else {
			result.error =
				"Something went wrong. Please try again later";
		}

		return result;
	}

	async confirmedRecords() {
		const thisUrl =
			main.url +
			"/booking/room-booking/confirmed/current-user";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();
		let result = {};
		if (data.reservationList) {
			result.data = data.reservationList;
		} else {
			result.error =
				"Something went wrong. Please try again later";
		}

		return result;
	}

	async checkinRecords() {
		const thisUrl =
			main.url +
			"/booking/room-booking/check-in/current-user";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();

		let result = {};
		if (data.order) {
			result.data = data.order;
		} else {
			result.error =
				"Something went wrong. Please try again later";
		}

		return result;
	}

	async checkoutRecords() {
		const thisUrl =
			main.url +
			"/booking/room-booking/check-out/current-user";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();

		let result = {};
		if (data.order) {
			result.data = data.order;
		} else {
			result.error =
				"Something went wrong. Please try again later";
		}

		return result;
	}
}

export default new Profile__connection();
