const BaseService = require("./base");
const StoryModel = require("../models/story");

class StoryService extends BaseService {
	constructor() {
		super(StoryModel);
	}
}

module.exports = new StoryService();
