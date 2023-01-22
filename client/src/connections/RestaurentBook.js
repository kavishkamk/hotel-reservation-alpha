import * as main from "./main-url";
import Auth from "../functions/Auth";

class RestaurentBook__connection {
	async tableBook(details) {
		const thisUrl = main.url + "/booking/restaurent-booking";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(details),
		});

		const data = await res.json();
		let result = {};

		if (data.booking) {
			result.status = true;
			result.orderId = data.booking.id;
		} else result.status = false;

		return result;
	}
}

export default new RestaurentBook__connection();
