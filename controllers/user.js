const Users = require("../services/user");

class UserController {
	constructor() {
		this.service = Users;
	}

	getAll(req, res, next) {
		try {
			const payload = Users.fetchAll();
			res.status(200).json({
				error: false,
				success: true,
				payload
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	}

	getOne(req, res, next) {
		try {
			const user = Users.fetchOne(req.params.id);

			res.status(200).json({
				error: false,
				success: true,
				payload: user
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	}

	update(req, res, next) {
		try {
			const user = Users.update(req.params.id, req.body);

			res.status(200).json({
				error: false,
				success: true,
				payload: user
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	}

	delete(req, res, next) {
		try {
			Users.delete(req.params.id);

			res.status(200).json({
				error: false,
				success: true,
				payload: null
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	}

	create(req, res, next) {
		try {
			const user = Users.create(req.body);

			res.status(201).json({
				error: false,
				success: true,
				payload: user
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	}
}

module.exports = new UserController();
