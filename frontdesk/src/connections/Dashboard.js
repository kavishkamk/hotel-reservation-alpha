import * as main from "./main-url";
import Auth from "../functions/Auth"

class Dashboard__connection {

	async getUserByEmail(email) {
		const thisUrl = main.url + "/users/email/" + email;
		const token = Auth.getToken();

		// console.log(thisUrl);
		// console.log(token);

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		let result = {};

		if (data.errorType === "NOT_FOUND") {
			result.error = "User account not found";
		} else if (data.errorType === "NOT_AUTHERIZED") {
			result.error = "Unauthorized access denied";
		} else if (data.user) {
			result.user = data.user;
		}

		return result;
	}

	async clientRegister(client) {
		const thisUrl = main.url + "/users/add-user";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(client),
		});
		const data = await res.json();
		console.log(data);

		let result = {};

		if (data.errorType) {
			if (data.errorType === "EXISTING_USER") {
				result.error =
					"User already exists. Use another email";
			} else {
				result.error =
					"Something went wrong. Please try again later";
			}
		} else {
			result.user = data.user;
		}
		return result;
	}

	async getClientCount() {
		const thisUrl = main.url + "/users/user-count";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		return data;
	}

	async getReservationtCount() {
		const thisUrl = main.url + "/users/user-count";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		return data;
	}

	async getPaymentCount() {
		const thisUrl = main.url + "/users/user-count";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		const data = await res.json();
		return data;
	}

	async getAllRooms() {
		const thisUrl = main.url + "/booking/room-types";
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
		
		let result = {
			data : []
		};

		if(data.roomType){
			// result.data = data.roomType
			data.roomType.forEach((roomType) => {
				result.data.push({
					id: roomType.id,
					name: roomType.roomType,
					price: roomType.price
				})
			})
		}
		else {
			result.error = "Rooms list couldn't be retrieved"
		}

		// console.log(result)
		return result;
	}

	async checkAvailability(check) {
		return true
	}

	async roomBooking(book) {
		const thisUrl =
			main.url + "/booking/room-booking/create-booking";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				
			})
		});
		const data = await res.json();
		console.log(data);
		
		
	}
}

export default new Dashboard__connection();