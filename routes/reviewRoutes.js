const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");

// Get all reviews for a movie
router.get("/movie/:movieId", reviewController.getMovieReviews);

// Get user's reviews (authenticated)
router.get("/user", auth, reviewController.getUserReviews);

// Create a review for a movie (authenticated)
router.post("/movie", auth, reviewController.createReview);

// Update user's review (authenticated)
router.put("/:reviewId", auth, reviewController.updateReview);

// Delete review (authenticated - either admin or review author)
router.delete("/:reviewId", auth, reviewController.deleteReview);

module.exports = router;
