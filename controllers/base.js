const HttpResponse = require("../models/http-response");

class BaseController {
	constructor(service) {
		this.service = service;
	}

	getAll(req, res, next) {
		const payload = this.service.fetchAll();

		res.status(200).json(new HttpResponse(true, payload, null));
	}

	getOne(req, res, next) {
		const payload = this.service.fetchOne(req.params.id);

		res.status(200).json(new HttpResponse(true, payload, null));
	}

	update(req, res, next) {
		const payload = this.service.update(req.params.id, req.body);

		res.status(200).json(new HttpResponse(true, payload, null));
	}

	delete(req, res, next) {
		this.service.delete(req.params.id);

		res.status(200).json(new HttpResponse(true, null, null));
	}

	create(req, res, next) {
		const payload = this.service.create(req.body);

		res.status(201).json(new HttpResponse(true, payload, null));
	}
}

module.exports = BaseController;
