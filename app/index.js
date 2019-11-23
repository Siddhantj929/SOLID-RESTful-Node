// Loading env variables and configurations
const config = require("../config");

// Initiating the app
const app = require("express")();

const errorHandler = require("../middlewares/error-handler");

// Adding middlewares
require("../middlewares")(app);

// Adding API routes
require("../routes")(app);

// Error handler
app.use(errorHandler);

// Starting the server
app.start = () =>
	app.listen(config.app.port, config.app.host, err => {
		if (err) throw new Error(err);
		console.log("Server started.");
	});

module.exports = app;
