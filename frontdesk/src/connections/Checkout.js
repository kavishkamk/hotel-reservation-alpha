import * as main from "./main-url";
import Auth from "../functions/Auth";

class Checkout__connection {
	async getBookingSummary(id) {
		const thisUrl =
			main.url +
			"/booking/room-booking/check-in/" +
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
		let result = []

		if(data.order) {
			result.data = data.order
		}else {
			result.error = "Something went wrong"
		}
		return result;
	}

	async setCheckout(id) {
		const thisUrl =
			main.url + "/booking/room-booking/checkOut/" + id;
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

		if (data.errorType) {
			result.error = "Something went wrong. Try again!";
		} else if (data.order) {
			result.status = true;
		}
		return result;
	}
}

export default new Checkout__connection();
