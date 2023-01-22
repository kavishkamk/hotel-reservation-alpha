import * as main from "./main-url"

class Auth__connection {

	async loginHandler(email, password) {
		const thisUrl = main.url + "/users/signin"
		const res = await fetch(thisUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json"},
			body: JSON.stringify({
				email: email,
        password: password
			})
		});
		const data = await res.json();
		let value = {}

		if(data.errorType){
			value.status = false

			data.errors.forEach((error, index)=> {
				if(error.message === "Email must be valid"){
					value.message = "Please enter a valid email address"
					return
				}else if(error.message === "Sign In fail. Invalid Email or Password"){
					value.message = "Invalid Email or Password. Please try again"
					return
				}
			})
		}else if(data.user){
			value.status = true
			value.user = data.user
		}

		return value
	}

	async logoutHandler() {
		const thisUrl = main.url + "/users/signout"
		const res = await fetch(thisUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if(Object.keys(data).length === 0){
			return true
		}else return false
	}
}

export default new Auth__connection();