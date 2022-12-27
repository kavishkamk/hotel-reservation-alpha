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

		if(data.currentUser != null){
			value = data.currentUser
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
				contactNumber: user.contactNumber
			})
		});

		const data = await res.json();
		console.log(data);
		let value = {}

		if(data.user){
			value.user = data.user
			Auth.saveUser(data.user)
		}else{
			value.error = "Something went wrong. Please try again later"
		}

		return value;
	}
}

export default new Profile__connection();
