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

		return restaurents;
	}

	async getFullRestaurentById(id) {
		const thisUrl =
			main.url + "/services/restaurents/" + id;
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();
		let result = {};

		const details = Restaurents__connection.#details;
		const images = Restaurents__connection.#images;

		if (data.restaurent) {
			result.restaurent = {
				...data.restaurent,
				details: details,
				images: images,
			};
		} else {
			result.error = "error";
		}

		return result;
	}

	async checkAvailability(check) {
		const thisUrl =
			main.url +
			"/booking/restaurent-booking/check-availability";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				numberOfTables: check.tables,
				numberOfPersons: check.guests,
				fromDate: check.date
			}),
		});

		const data = await res.json();
		let restaurents = [];

		data.freeRestaurentList.forEach(async (item) => {
			const restaurent = await this.getFullRestaurentById(item.id);

			if (restaurent.restaurent) {
				const rest = restaurent.restaurent;

				restaurents.push({
					id: item.id,
					name: item.restaurentType,
					description: rest.description,
					image: rest.imageURL,
					images: rest.images,
					details: rest.details,
					stars: rest.stars,
					tags: rest.tags,
				});
			}
		});

		return restaurents;
	}
}

export default new Restaurents__connection();