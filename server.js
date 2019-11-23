const express = require("express");
const bodyParser = require("body-parser");
const { connectToDatabase } = require("./database");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
connectToDatabase(database => {
	const Users = require("./models/user");

	// USERS

	app.get("/users", (req, res, next) => {
		try {
			const payload = Users.readAll();
			res.status(200).json({
				error: false,
				success: true,
				payload
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	app.get("/users/:id", (req, res, next) => {
		try {
			const user = Users.read(req.params.id);

			res.status(200).json({
				error: false,
				success: true,
				payload: user
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	app.post("/users", (req, res, next) => {
		try {
			const user = Users.create(req.body);

			res.status(201).json({
				error: false,
				success: true,
				payload: user
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	app.patch("/users/:id", (req, res, next) => {
		try {
			const user = Users.update(req.params.id, req.body);

			res.status(200).json({
				error: false,
				success: true,
				payload: user
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	app.delete("/users/:id", (req, res, next) => {
		try {
			Users.delete(req.params.id);

			res.status(200).json({
				error: false,
				success: true,
				payload: null
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	// STORIES

	app.get("/stories", (req, res, next) => {
		try {
			if (!database.stories || database.stories.length === 0) {
				const error = new Error("No stories found");
				error.status = 404;
				throw error;
			}

			res.status(200).json({
				error: false,
				success: true,
				payload: database.stories
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	app.get("/stories/:id", (req, res, next) => {
		try {
			const story = database.stories.find(s => s.id == req.params.id);

			if (!story) {
				const error = new Error("No story with this id was found.");
				error.status = 404;
				throw error;
			}

			res.status(200).json({
				error: false,
				success: true,
				payload: story
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	app.post("/stories", (req, res, next) => {
		try {
			const text = req.body.text;
			const author = req.body.author;

			if (!text || !author) {
				const error = new Error("Wrong data sent");
				error.status = 422;
				throw error;
			}

			const story = {
				text: text,
				author: author,
				id: database.stories.length
			};

			database.stories.push(story);

			res.status(201).json({
				error: false,
				success: true,
				payload: story
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	app.patch("/stories/:id", (req, res, next) => {
		try {
			const storyIndex = database.stories.findIndex(
				s => s.id == req.params.id
			);

			if (!storyIndex || storyIndex === -1) {
				const error = new Error("No story with this id was found.");
				error.status = 404;
				throw error;
			}

			const authorId = parseInt(req.body.author);

			const authorIndex = database.users.findIndex(
				u => u.id === authorId
			);

			if (
				!authorIndex ||
				authorIndex === -1 ||
				database.stories[storyIndex].author !== authorId
			) {
				const error = new Error(
					"You are not authorized to edit this story."
				);
				error.status = 401;
				throw error;
			}

			database.stories[storyIndex].text =
				req.body.text || database.stories[storyIndex].text;

			res.status(200).json({
				error: false,
				success: true,
				payload: database.stories[storyIndex]
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	app.delete("/stories/:id", (req, res, next) => {
		try {
			const storyIndex = database.stories.findIndex(
				s => s.id == req.params.id
			);

			const authorId = parseInt(req.body.author);

			const authorIndex = database.users.findIndex(
				u => u.id === authorId
			);

			if (
				!authorIndex ||
				authorIndex === -1 ||
				database.stories[storyIndex].author !== authorId
			) {
				const error = new Error(
					"You are not authorized to delete this story."
				);
				error.status = 401;
				throw error;
			}

			database.stories = database.stories.filter(
				s => s.id != req.params.id
			);

			database.users[authorIndex].stories = database.users[
				authorIndex
			].stories.filter(s => s != req.params.id);

			res.status(200).json({
				error: false,
				success: true,
				payload: null
			});
		} catch (err) {
			res.status(err.status || 500).json({
				error: true,
				success: false,
				payload: err.message
			});
		}
	});

	console.log(database);

	if (database) {
		app.listen(3000);
		console.log("Server started.");
	} else {
		console.log("Error while connecting to databse.\n\n=>", err);
	}
});
