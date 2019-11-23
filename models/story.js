const mongoose = require("mongoose");
const storySchema = require("../schemas/story");

const storyModel = mongoose.model("Stories", storySchema);

module.exports = storyModel;
