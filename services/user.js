const BaseService = require("./base");
const UserModel = require("../models/user");

class UserService extends BaseService {
	constructor() {
		super(UserModel);
	}
}

module.exports = new UserService();
