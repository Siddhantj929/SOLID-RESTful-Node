const express = require("express");
const bodyParser = require("body-parser");
const { connectToDatabase } = require("./database");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
connectToDatabase(database => {
	const UserController = require("./controllers/user");
	const StoryController = require("./controllers/story");

	// USERS

	app.get("/users", UserController.getAll.bind(UserController));

	app.get("/users/:id", UserController.getOne.bind(UserController));

	app.post("/users", UserController.create.bind(UserController));

	app.patch("/users/:id", UserController.update.bind(UserController));

	app.delete("/users/:id", UserController.delete.bind(UserController));

	// STORIES

	app.get("/stories", StoryController.getAll.bind(StoryController));

	app.get("/stories/:id", StoryController.getOne.bind(StoryController));

	app.post("/stories", StoryController.create.bind(StoryController));

	app.patch("/stories/:id", StoryController.update.bind(StoryController));

	app.delete("/stories/:id", StoryController.delete.bind(StoryController));

	// Starting the server

	if (database) {
		app.listen(3000);
		console.log("Server started.");
	} else {
		console.log("Error while connecting to databse.\n\n=>", err);
	}
});
