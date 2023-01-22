import * as main from "./main-url";
import Auth from "../functions/Auth";

class Rooms__connection {
	static #roomDetails = [
		{
			topic: "Features",
			content: [
				"Each room offers 42 sqm / 452 sqf of luxury.",
				"Memorable views of the lake and city.",
				"Large, modern bathroom with walk-in shower and separate bathtub.",
				"Wi-Fi.",
				"Signature bed with 300-thread-count lightweight duvet.",
			],
		},
		{
			topic: "Bath & Personal Care",
			content: [
				"Walk-in shower and/or separate bathtub",
				"Bathroom mirror",
				"Plush bathrobes and slippers",
				"300 thread count linen",
				"Pillow menu with hypoallergenic options",
				"Iron and ironing board",
			],
		},
		{
			topic: "Media & Entertainment",
			content: [
				"High-speed Internet access",
				"Flatscreen TV",
				"Wide selection of international and local television channels",
			],
		},
		{
			topic: "Refreshments",
			content: [
				"Minibar",
				"Water",
				"Tea and coffee making facilities",
			],
		},
	];

	static #images = [
		"https://imgur.com/TUa5mu0.png",
		"https://imgur.com/ShevdYs.png",
		"https://imgur.com/1LX56gs.png",
	];

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

	async getAllRooms() {
		const thisUrl = main.url + "/services/rooms";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});

		const data = await res.json();
		let rooms = [];

		const details = Rooms__connection.#roomDetails;
		const images = Rooms__connection.#images;

		data.rooms.forEach((room) => {
			rooms.push({
				id: room.id,
				name: room.roomType,
				description: room.description,
				details: details,
				image: room.imageURL,
				images: images,
				price: room.price,
				stars: room.stars,
				tags: room.tags,
			});
		});

		return rooms;
	}

	async filterRooms(tags) {
		const thisUrl = main.url + "/services/rooms/filter";
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
		let rooms = [];

		const details = Rooms__connection.#roomDetails;
		const images = Rooms__connection.#images;

		data.rooms.forEach((room) => {
			rooms.push({
				id: room.id,
				name: room.roomType,
				description: room.description,
				details: details,
				image: room.imageURL,
				images: images,
				price: room.price,
				stars: room.stars,
				tags: room.tags,
			});
		});

		return rooms;
	}

	async getRoomById(id) {
		const thisUrl = main.url + "/services/rooms/" + id;
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

		if (data.room) {
			result.room = data.room.roomType;
		} else {
			result.error = "error";
		}

		return result;
	}

	async getFullRoomById(id) {
		const thisUrl = main.url + "/services/rooms/" + id;
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

		const details = Rooms__connection.#roomDetails;
		const images = Rooms__connection.#images;

		if (data.room) {
			result.room = {
				...data.room,
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
			main.url + "/booking/room-booking/check-availability";
		const token = Auth.getToken();

		const res = await fetch(thisUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				numberOfRooms: check.rooms,
				numberOfPersons: check.guests,
				fromDate: check.checkin,
				toDate: check.checkout,
			}),
		});

		const data = await res.json();

		let rooms = [];

		const details = Rooms__connection.#roomDetails;
		const images = Rooms__connection.#images;

		data.freeRoomList.forEach(async (room) => {
			const roomData = await this.getFullRoomById(room.id);

			if (roomData.room) {
				rooms.push({
					id: room.id,
					name: room.roomType,
					details: details,
					images: images,
					price: room.price,
					description: roomData.room.description,
					image: roomData.room.imageURL,
					stars: roomData.room.stars,
					tags: roomData.room.tags,
				});
			}
		});

		return rooms;
	}
}

export default new Rooms__connection();
