const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// Public routes
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovie);

// Admin only routes
router.post("/", auth, isAdmin, movieController.createMovie);
router.put("/:id", auth, isAdmin, movieController.updateMovie);
router.delete("/:id", auth, isAdmin, movieController.deleteMovie);

module.exports = router;
