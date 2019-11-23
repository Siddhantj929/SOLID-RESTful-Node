const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema(
	{
		text: String,
		author: { type: Schema.Types.ObjectId, ref: "Users" }
	},
	{
		timestamps: true
	}
);

module.exports = storySchema;
