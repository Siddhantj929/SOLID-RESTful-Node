const BaseService = require("./base");
const Stories = require("../models/story");
const Users = require("../models/user");

class StoryService extends BaseService {
	constructor() {
		super(Stories);
	}

	async create(data) {
		const story = await super.create(data);
		await Users.findByIdAndUpdate(data.author, {
			$push: { stories: story }
		});
		return story;
	}

	async delete(id, data) {
		await super.delete(id, data);
		await Users.findByIdAndUpdate(data.author, {
			$pull: { stories: id }
		});
		return true;
	}
}

module.exports = new StoryService();
