const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const database = {
	users: [
		{
			name: "Siddhant",
			id: 0,
			stories: [0, 1]
		},
		{
			name: "Muskaan",
			id: 1,
			stories: [2, 3]
		}
	],
	stories: [
		{
			text: "Story 1 written by Siddhant Jain",
			id: 0,
			author: 0
		},
		{
			text: "Story 2 written by Siddhant Jain",
			id: 1,
			author: 0
		},
		{
			text: "Story 1 written by Muskaan Jain",
			id: 2,
			author: 1
		},
		{
			text: "Story 2 written by Muskaan Jain",
			id: 3,
			author: 1
		}
	]
};

// USERS

app.get("/users", (req, res, next) => {
	try {
		if (!database.users || database.users.length === 0) {
			const error = new Error("No users found");
			error.status = 404;
			throw error;
		}

		res.status(200).json({
			error: false,
			success: true,
			payload: database.users
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
		const user = database.users.find(u => u.id == req.params.id);

		if (!user) {
			const error = new Error("No user with this id was found.");
			error.status = 404;
			throw error;
		}

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
		const name = req.body.name;

		if (!name) {
			const error = new Error("Wrong data sent");
			error.status = 422;
			throw error;
		}

		const user = {
			name: name,
			stories: [],
			id: database.users.length
		};

		database.users.push(user);

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
		const userIndex = database.users.findIndex(u => u.id == req.params.id);

		if (!userIndex || userIndex === -1) {
			const error = new Error("No user with this id was found.");
			error.status = 404;
			throw error;
		}

		database.users[userIndex].name =
			req.body.name || database.users[userIndex].name;

		res.status(200).json({
			error: false,
			success: true,
			payload: database.users[userIndex]
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
		database.users = database.users.filter(u => u.id != req.params.id);

		database.stories = database.stories.filter(
			s => s.author !== req.params.id
		);

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

		const authorIndex = database.users.findIndex(u => u.id === authorId);

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

		const authorIndex = database.users.findIndex(u => u.id === authorId);

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

		database.stories = database.stories.filter(s => s.id != req.params.id);

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

if (database) {
	app.listen(3000);
	console.log("Server started.");
}
