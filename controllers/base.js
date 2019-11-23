class BaseController {
	constructor(service) {
		this.service = service;
	}

	getAll(req, res, next) {
		try {
			const payload = this.service.fetchAll();
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
			const payload = this.service.fetchOne(req.params.id);

			res.status(200).json({
				error: false,
				success: true,
				payload: payload
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
			const payload = this.service.update(req.params.id, req.body);

			res.status(200).json({
				error: false,
				success: true,
				payload: payload
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
			this.service.delete(req.params.id);

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
			const payload = this.service.create(req.body);

			res.status(201).json({
				error: false,
				success: true,
				payload: payload
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

module.exports = BaseController;
