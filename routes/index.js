const { Router } = require("express");
const config = require("../config");

const { addUserRoutes } = require("./user");
const { addStoryRoutes } = require("./story");

module.exports = app => {
	router = Router();

	addUserRoutes(router);
	addStoryRoutes(router);

	app.use(config.api.prefix, router);
};
