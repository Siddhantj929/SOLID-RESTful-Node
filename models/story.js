const { instance } = require("../database");

const database = instance;

const Users = require("./user");

class StoryModel {
	static readAll() {
		if (!database.stories || database.stories.length === 0) {
			const error = new Error("No stories found");
			error.status = 404;
			throw error;
		}

		return database.stories;
	}

	static read(id) {
		const story = database.stories.find(s => s.id == id);

		if (!story) {
			const error = new Error("No story with this id was found.");
			error.status = 404;
			throw error;
		}

		return story;
	}

	static create(data) {
		const text = data.text;
		const author = Users.read(data.author);

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

		// Update author's data
		author.stories.push(story.id);

		database.stories.push(story);

		return story;
	}

	static update(id, data) {
		const storyIndex = database.stories.findIndex(s => s.id == id);

		if (!storyIndex || storyIndex === -1) {
			const error = new Error("No story with this id was found.");
			error.status = 404;
			throw error;
		}

		const authorId = parseInt(data.author);

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
			data.text || database.stories[storyIndex].text;

		return database.stories[storyIndex];
	}

	static delete(id, data) {
		const storyIndex = database.stories.findIndex(s => s.id == id);

		const authorId = parseInt(data.author);

		const author = Users.read(authorId);

		if (!author || database.stories[storyIndex].author !== author.id) {
			const error = new Error(
				"You are not authorized to delete this story."
			);
			error.status = 401;
			throw error;
		}

		database.stories = database.stories.filter(s => s.id != id);

		// Updating author to remove the story from data just deleted
		author.stories = database.users[authorIndex].stories.filter(
			s => s != id
		);

		return true;
	}
}

module.exports = StoryModel;
