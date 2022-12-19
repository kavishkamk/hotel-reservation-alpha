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

	saveUser(officer) {
		sessionStorage.setItem("user", JSON.stringify(officer));
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
}

export default new Auth();
