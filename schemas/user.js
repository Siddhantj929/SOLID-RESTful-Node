const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: String,
		stories: [{ type: Schema.Types.ObjectId, ref: "Stories" }]
	},
	{
		timestamps: true
	}
);

module.exports = userSchema;
