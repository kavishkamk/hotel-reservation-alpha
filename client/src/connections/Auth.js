import * as main from "./main-url";

class Auth__connection {

	async registerHandler(
		fname,
		lname,
		address,
		nic,
		phoneNo,
		email,
		password
	) {
		const thisUrl = main.url + "/users/signup";
		const res = await fetch(thisUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				firstName: fname,
				lastName: lname,
				email: email,
				password: password,
				contactNumber: phoneNo,
				address: address,
				nicNumber: nic,
				isAdmin: false,
			}),
		});
		const data = await res.json();

		let value = {};

		if (data.errorType) {
			value.status = false;

			data.errors.forEach((error, index) => {
				if (error.message === "Email must be valid") {
					value.message =
						"Please enter a valid email address";
					return;
				} else if (
					error.message === "NIC number required"
				) {
					value.message = "Please enter a valid NIC number";
					return;
				} else if (
					error.message === "Acount is not activated"
				) {
					value.message =
						"Account is already created. Please check your email and enter the verification code to complete registration";
				} else {
					value.message = error.message;
				}
			});
		} else if (data.user) {
			value.user = data.user;

			const res1 = await this.otpSending(email);

			if (
				res1.message ===
				"Send OTP Success. Plase check your mail box"
			) {
				value.message =
					"Please check your email and enter the verification code to complete registration";

				value.status = true;
			} else {
				value.status = false;
				value.message =
					"Something went wrong. Please try again later";
			}
		}

		return value;
	}

	async otpSending(email) {
		const thisUrl = main.url + "/users/requestotp";
		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
			}),
		});
		const data = await res.json();
		
		let value = {};

		if (data.errorType) {
			value.status = false;

			data.errors.forEach((error, index) => {
				if (error.message === "Account Already Activated") {
					value.message = error.message;
					return;
				}
			});
		} else if (
			data.message ===
			"Send OTP Success. Plase check your mail box"
		) {
			value.message = data.message;
		}
		return value;
	}

	async otpConfirm(email, code) {
		const thisUrl = main.url + "/users/activate";
		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				otpCode: code,
			}),
		});
		const data = await res.json();

		let value = {}

		if (data.errorType) {
			return {
				status: false,
				message: "Invalid email or verification code"
			}
		}else {
			value.status = true;
		}
		return value;
	}

	async loginHandler(email, password) {
		const thisUrl = main.url + "/users/signin";
		const res = await fetch(thisUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const data = await res.json();
		let value = {};

		if (data.errorType) {
			value.status = false;

			data.errors.forEach((error, index) => {
				if (error.message === "Email must be valid") {
					value.message =
						"Please enter a valid email address";
					return;
				} else if (
					error.message ===
					"Sign In fail. Invalid Email or Password"
				) {
					value.message =
						"Invalid Email or Password. Please try again";
					return;
				}
			});
		} else if (data.user) {
			value.status = true;
			value.user = data.user;
		}

		return value;
	}

	async logoutHandler() {
		const thisUrl = main.url + "/users/signout";
		const res = await fetch(thisUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (Object.keys(data).length === 0) {
			return true;
		} else return false;
	}
}

export default new Auth__connection();
