const Users = require("../models/user");

class UserService {
	constructor() {
		this.model = Users;
	}

	create(data) {
		console.log("<UserService> : Creating User...");
		return this.model.create(data);
	}

	fetchOne(id) {
		console.log(`<UserService> : Finding User with id ${id}...`);
		return this.model.read(id);
	}

	fetchAll() {
		console.log(`<UserService> : Fetching all users...`);
		return this.model.readAll();
	}

	update(id, data) {
		console.log(`<UserService> : Updating User with id ${id}...`);
		return this.model.update(id, data);
	}

	delete(id, data) {
		console.log(`<UserService> : Deleting User with id ${id}...`);
		return this.model.delete(id);
	}
}

module.exports = new UserService();
