import * as main from "./main-url";
import Auth from "../functions/Auth";

class RoomBook__connection {
	async roomBook(details) {
		const thisUrl = main.url + "/booking/room-booking";
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
		console.log(data);
		let result;

		if (data.booking) result = true;
		else result = false;

		return result;
	}
}

export default new RoomBook__connection();
