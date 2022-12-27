class Auth {
	constructor() {
		this.authenticated = this.getSession();
	}

	// store login data in the session storage
	saveSession(status) {
		sessionStorage.setItem(
			"loginStatus",
			JSON.stringify(status)
		);
	}

	saveToken(token) {
		sessionStorage.setItem("token", JSON.stringify(token));
	}

	getToken() {
		const tokenString = sessionStorage.getItem("token");
		const token = JSON.parse(tokenString);
		return token;
	}

	saveUser(officer) {
		sessionStorage.setItem("user", JSON.stringify(officer));
		if (officer.jwt) this.saveToken(officer.jwt);
	}

	getUser() {
		const tokenString = sessionStorage.getItem("user");
		const user = JSON.parse(tokenString);
		return user;
	}

	// get the login status from the session
	// true -> logged in
	// false -> not logged in
	getSession() {
		const tokenString =
			sessionStorage.getItem("loginStatus");
		const loginStatus = JSON.parse(tokenString);
		return loginStatus ? loginStatus : false;
	}

	// login session is deleted when the password is changed
	deleteSession() {
		sessionStorage.removeItem("loginStatus");
	}

	login(cb, user) {
		this.authenticated = true;
		this.saveSession(true);
		// this.saveLoginData(id, pswd);

		this.saveUser(user);
		cb();
		// callback function
	}

	logout(cb) {
		this.authenticated = false;
		this.deleteSession();
		cb();
	}

	isAuthenticated() {
		return this.authenticated;
	}

	saveClientEmail(email) {
		sessionStorage.setItem("clientEmail", JSON.stringify(email));
	}

	getClientEmail() {
		const tokenString = sessionStorage.getItem("clientEmail");
		const email = JSON.parse(tokenString);
		return email ? email : "";
	}
}

export default new Auth();
