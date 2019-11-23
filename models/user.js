const { instance } = require("../database");

const database = instance;

class UserModel {
	static readAll() {
		if (!database.users || database.users.length === 0) {
			const error = new Error("No users found");
			error.status = 404;
			throw error;
		}

		return database.users;
	}

	static read(id) {
		const user = database.users.find(u => u.id == id);

		if (!user) {
			const error = new Error("No user with this id was found.");
			error.status = 404;
			throw error;
		}

		return user;
	}

	static create(data) {
		const name = data.name;

		if (!name) {
			const error = new Error("Wrong data sent");
			error.status = 422;
			throw error;
		}

		const user = {
			name: name,
			stories: [],
			id: database.users.length
		};

		database.users.push(user);

		return user;
	}

	static update(id, data) {
		const userIndex = database.users.findIndex(u => u.id == id);

		if (!userIndex || userIndex === -1) {
			const error = new Error("No user with this id was found.");
			error.status = 404;
			throw error;
		}

		database.users[userIndex].name =
			data.name || database.users[userIndex].name;

		return database.users[userIndex];
	}

	static delete(id) {
		const userIndex = database.users.findIndex(u => u.id == id);

		if (!userIndex || userIndex === -1) {
			const error = new Error("No user with this id was found.");
			error.status = 404;
			throw error;
		}

		database.users = database.users.filter(u => u.id != id);

		database.stories = database.stories.filter(s => s.author !== id);

		return true;
	}
}

module.exports = UserModel;
