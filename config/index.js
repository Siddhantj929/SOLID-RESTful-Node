require("dotenv").config();

const appConfig = require("./app-config");
const databaseConfig = require("./database-config");
const apiConfig = require("./api-config");

module.exports = {
	app: appConfig,
	database: databaseConfig,
	api: apiConfig
};
