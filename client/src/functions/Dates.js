class Dates {
	getDifferenceInDays(date1, date2) {
		date1 = new Date(date1)
		date2 = new Date(date2)
		const diffInMs = Math.abs(date2 - date1);
		return diffInMs / (1000 * 60 * 60 * 24);
	}

	formatDate(date) {
		date = new Date(date);
		let dd = String(date.getDate()).padStart(2, "0");
		let mm = String(date.getMonth() + 1).padStart(2, "0"); //janvier = 0
		let yyyy = date.getFullYear();
		return `${dd}-${mm}-${yyyy}`; 
	}

	formatDateTime(dateTime) {
		dateTime = new Date(dateTime);
		let dd = String(dateTime.getDate()).padStart(2, "0");
		let mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //janvier = 0
		let yyyy = dateTime.getFullYear();
		const hours = ("0" + dateTime.getHours()).slice(-2);
		const minutes = ("0" + dateTime.getMinutes()).slice(-2);
		const seconds = ("0" + dateTime.getSeconds()).slice(-2);
		return `${dd}-${mm}-${yyyy}, ${hours}:${minutes}:${seconds}`; 
	}
}

export default new Dates();