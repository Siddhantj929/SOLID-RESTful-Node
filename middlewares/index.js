const bodyParser = require("body-parser");
const morgan = require("morgan")("common");
const helmet = require("helmet")();
const compression = require("compression")();

module.exports = app => {
	// Parsing incoming request body
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// Logger
	app.use(morgan);

	// Protection headers
	app.use(helmet);

	// GZIP compression
	app.use(compression);
};
