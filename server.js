const express = require("express");
const bodyParser = require("body-parser");
const { connectToDatabase } = require("./database");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
connectToDatabase(database => {
	const Users = require("./models/user");
	const Stories = require("./models/story");

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
			const stories = Stories.readAll();

			res.status(200).json({
				error: false,
				success: true,
				payload: stories
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
			const story = Stories.read(req.params.id);

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
			const story = Stories.create(req.body);

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
			const story = Stories.update(req.params.id, req.body);

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

	app.delete("/stories/:id", (req, res, next) => {
		try {
			Stories.delete(req.params.id, req.body);

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
