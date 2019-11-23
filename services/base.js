class BaseService {
	constructor(model) {
		this.model = model;
	}

	create(data) {
		console.log("<Service> : Creating...");
		return this.model.create(data);
	}

	fetchOne(id) {
		console.log(`<Service> : Finding with id ${id}...`);
		return this.model.read(id);
	}

	fetchAll() {
		console.log(`<Service> : Fetching all...`);
		return this.model.readAll();
	}

	update(id, data) {
		console.log(`<Service> : Updating with id ${id}...`);
		return this.model.update(id, data);
	}

	delete(id, data) {
		console.log(`<Service> : Deleting with id ${id}...`);
		return this.model.delete(id);
	}
}

module.exports = BaseService;
