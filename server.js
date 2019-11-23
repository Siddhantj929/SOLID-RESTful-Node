const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error-handler");

const app = express();

// Configuring the app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
const { connectToDatabase } = require("./database");

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

	// Error handler
	app.use(errorHandler);

	// Starting the server
	if (database) {
		app.listen(3000);
		console.log("Server started.");
	} else {
		console.log("Error while connecting to databse.\n\n=>", err);
	}
});
