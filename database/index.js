const mongoose = require("mongoose");
const config = require("../config");

const connectToDatabase = () =>
    mongoose.connect(config.database.uri, {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
    });

exports.connectToDatabase = connectToDatabase;
