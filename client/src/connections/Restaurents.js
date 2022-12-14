import * as main from "./main-url";
import Auth from "../functions/Auth";

class Restaurents__connection {
	static #details = [
		{
			topic: "Price Range",
			content: ["LKR.2,000 - LKR.30,000"],
		},
		{
			topic: "Cuisines",
			content: ["Chinese"],
		},
		{
			topic: "Meals",
			content: ["Lunch", "Dinner"],
		},
		{
			topic: "Features",
			content: [
				"Takeout, Reservations, Private Dining, and Seating",
				"Parking Available",
				"Validated Parking",
				"Valet Parking",
				"Highchairs Available",
				"Wheelchair Accessible",
				"Serves Alcohol",
				"Full Bar",
				"Free Wifi",
				"Accepts Credit Cards",
				"Table Service",
			],
		},
	];

	static #images = [
		"https://imgur.com/sWWZCoj.png",
		"https://imgur.com/5be4BGh.png",
		"https://imgur.com/IdUEfcm.png",
	];

	async getAllTags() {
		const thisUrl = main.url + "/services/restaurenttags";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();

		if (!data.tags) {
			return "Something went wrong";
		}

		const tags = data.tags;

		let tagsFormat = [];
		let count = 0;

		tags.forEach((tag) => {
			tagsFormat.push({
				id: tag.id,
				label: count,
				content: tag.tagName,
			});
			count += 1;
		});

		console.log(tagsFormat);
		return tagsFormat;
	}

	async getAllRestaurents() {
		const thisUrl = main.url + "/services/restaurents";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();
		let restaurents = [];

		const details = Restaurents__connection.#details
		const images = Restaurents__connection.#images

		// console.log(data)

		data.restaurent.forEach((item)=> {
			restaurents.push({
				id: item.id,
				name: item.restaurentType,
				description: item.description,
				image: item.imageURL,
				images: images,
				details: details,
				stars: item.stars,
				tags: item.tags
			})
		})

		console.log(restaurents)
		return restaurents
	}

	async filterRestaurents(tags) {
		const thisUrl =
			main.url + "/services/restaurents/filter";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				tags: tags,
			}),
		});

		const data = await res.json();
		let restaurents = [];

		const details = Restaurents__connection.#details;
		const images = Restaurents__connection.#images;

		// console.log(data);

		data.restaurents.forEach((item) => {
			restaurents.push({
				id: item.id,
				name: item.restaurentType,
				description: item.description,
				image: item.imageURL,
				images: images,
				details: details,
				stars: item.stars,
				tags: item.tags,
			});
		});

		console.log(restaurents);
		return restaurents;
	}
}

export default new Restaurents__connection();