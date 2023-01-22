import * as main from "./main-url";
import Auth from "../functions/Auth"

class Dashboard__connection {

	async getUserByEmail(email) {
		const thisUrl = main.url + "/users/email/" + email;
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
		const thisUrl =
			main.url +
			"/booking/room-booking/totle-reservation-count";
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
		const thisUrl =
			main.url +
			"/booking/room-booking/total-paied-reservation";
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
		
		let result = {
			data : []
		};

		if(data.roomType){
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
		return result;
	}

	async checkAvailability(check) {
		const thisUrl =
			main.url + "/booking/room-booking/check-availability";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(check),
		});
		const data = await res.json();
		let result = {
			rooms: []
		}

		if(data.freeRoomList){
			data.freeRoomList.forEach(room => {
				result.rooms.push({
					id: room.id,
					name: room.roomType,
					price: room.price
				})
			});
		}else {
			result.error = "Something went wrong"
		}

		return result
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
			body: JSON.stringify(book)
		});
		const data = await res.json();

		let result = {};
		if(data.booking){
			result.booking = data.booking
		}else {
			result.error = "Something went wrong"
		}
		
		return result;
	}

	async roomBookingPayment(orderId) {
		const thisUrl =
			main.url + "/payments/room-type/set-to-paid/"+ orderId;
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			}
		});
		const data = await res.json();

		if(data.order){
			return true
		}else {
			return false
		}
	}
}

export default new Dashboard__connection();