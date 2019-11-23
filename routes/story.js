const { Router } = require("express");
const StoryController = require("../controllers/story");

const router = Router();

// Configuring the routes

router.get("/", StoryController.getAll.bind(StoryController));

router.get("/:id", StoryController.getOne.bind(StoryController));

router.post("/", StoryController.create.bind(StoryController));

router.patch("/:id", StoryController.update.bind(StoryController));

router.delete("/:id", StoryController.delete.bind(StoryController));

// Exporting the Route handler

const addStoryRoutes = app => {
	app.use(`/stories`, router);
};

exports.addStoryRoutes = addStoryRoutes;
