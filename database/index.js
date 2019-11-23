const mongoose = require("mongoose");
const config = require("../config");

const connectToDatabase = () =>
	mongoose.connect(config.database.uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

exports.connectToDatabase = connectToDatabase;
