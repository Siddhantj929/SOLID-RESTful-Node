const HttpResponse = require("../models/http-response");

class BaseController {
	constructor(service) {
		this.service = service;
	}

	async getAll(req, res, next) {
		const payload = await this.service.fetchAll();

		res.status(200).json(new HttpResponse(true, payload, null));
	}

	async getOne(req, res, next) {
		const payload = await this.service.fetchOne(req.params.id);

		res.status(200).json(new HttpResponse(true, payload, null));
	}

	async update(req, res, next) {
		const payload = await this.service.update(req.params.id, req.body);

		res.status(200).json(new HttpResponse(true, payload, null));
	}

	async delete(req, res, next) {
		await this.service.delete(req.params.id);

		res.status(200).json(new HttpResponse(true, null, null));
	}

	async create(req, res, next) {
		const payload = await this.service.create(req.body);

		res.status(201).json(new HttpResponse(true, payload, null));
	}
}

module.exports = BaseController;
