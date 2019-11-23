const mongoose = require("mongoose");
const userSchema = require("../schemas/user");

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
