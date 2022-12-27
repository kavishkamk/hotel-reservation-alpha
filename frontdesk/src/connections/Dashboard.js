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
		let result = {}

		if(data.errorType === "NOT_FOUND"){
			result.error = "User account not found"
		}else if(data.errorType === "NOT_AUTHERIZED"){
			result.error = "Unauthorized access denied"
		}
		else if(data.user){
			result.user = data.user
		}

		return result
	}

	async clientRegister(client){
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

		let result = {}

		if(data.errorType){
			if(data.errorType === "EXISTING_USER"){
				result.error = "User already exists. Use another email"
			}else {
				result.error = "Something went wrong. Please try again later"
			}
		}else {
			result.user = data.user
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
			}
		});
		const data = await res.json();
		return data;
	}
}

export default new Dashboard__connection();