import * as main from "./main-url";
import Auth from "../functions/Auth";

class Checkout__connection {
	async getBookingSummary(id) {
		const thisUrl =
			main.url +
			"/booking/room-booking/check-in/" +
			id;
		const token = Auth.getToken();

		// console.log(thisUrl);

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		// console.log(data);
		let result = []

		if(data.order) {
			result.data = data.order
		}else {
			result.error = "Something went wrong"
		}
		return result;
	}
}

export default new Checkout__connection();
