const BaseController = require("./base");
const Users = require("../services/user");

class UserController extends BaseController {
	constructor() {
		super(Users);
	}
}

const controller = new UserController();

module.exports = controller;
