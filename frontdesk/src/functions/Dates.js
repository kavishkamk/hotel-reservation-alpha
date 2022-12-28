class Dates {
	getDifferenceInDays(date1, date2) {
		date1 = new Date(date1)
		date2 = new Date(date2)
		const diffInMs = Math.abs(date2 - date1);
		return diffInMs / (1000 * 60 * 60 * 24);
	}
}

export default new Dates();