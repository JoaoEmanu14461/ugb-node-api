const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/movies.controller");

router.get("/", moviesController.list);
router.post("/", moviesController.create);
router.post("/link", moviesController.linkHero);
module.exports = router;