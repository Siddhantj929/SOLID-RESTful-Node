const BaseController = require("./base");
const Stories = require("../services/story");

class StoryController extends BaseController {
	constructor() {
		super(Stories);
	}
}

const controller = new StoryController();

module.exports = controller;
