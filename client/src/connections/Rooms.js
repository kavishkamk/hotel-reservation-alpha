import * as main from "./main-url";
import Auth from "../functions/Auth";

class Rooms__connection {
	
	async getAllRoomsTags() {
		const thisUrl = main.url + "/services/roomtags";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();

		if(!data.tags){
			return "Something went wrong"
		}

		const tags = data.tags
		let tagsFormat = []

		tags.forEach(tag => {
			tagsFormat.push({
				label: tag.tagName,
				content: tag.tagName,
			});
		});

		console.log(tagsFormat)
		return tagsFormat
	}
}

export default new Rooms__connection();
