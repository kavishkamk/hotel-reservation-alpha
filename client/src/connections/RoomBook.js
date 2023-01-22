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
		let result = {};

		if (data.booking){
			result.status = true;
			result.orderId = data.booking._id
		}
		else result.status = false;

		return result;
	}

	async paymentUpload(details) {
		const thisUrl = main.url + "/payments/room-type";
		const token = Auth.getToken();

		const formData = new FormData()
		formData.append('orderId', details.orderId)
		formData.append('paymentSlip', details.paymentSlip)

		const res = await fetch(thisUrl, {
			method: "POST",
			headers: {
				// "Content-Type": "application/json",
				Authorization: token,
			},
			body: formData,
		});

		const data = await res.json();
		let result={}

		if(data.errors){
			result.status = false
			result.error = data.errors[0].message
		}else {
			result.status = true
			result.payment = data.payment
		}
		return result
	}
}

export default new RoomBook__connection();
