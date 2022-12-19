import * as main from "./main-url";

class Profile__connection {

	async getUserData() {
		const thisUrl = main.url + "/users/currentuser";
		const res = await fetch(thisUrl, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		const data = await res.json();
		let value = {};

		console.log(data)
		return data
	}

}

export default new Profile__connection()