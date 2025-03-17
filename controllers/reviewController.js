const Review = require("../models/Review");
const Movie = require("../models/Movie");

// Get all reviews for a movie
exports.getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { movieId: req.params.movieId },
      include: [
        {
          model: Movie,
          as: "movie",
          attributes: ["title"],
        },
      ],
    });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { description, rating, movieId } = req.body;
    const userId = req.user.id; // Get userId from JWT token

    // Check if user already reviewed this movie
    const existingReview = await Review.findOne({
      where: { userId, movieId },
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this movie" });
    }

    const review = await Review.create({
      description,
      rating,
      userId,
      movieId,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a review (only by the review author or admin)
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is the author of the review or admin
    if (review.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Not authorized to update this review",
        currentUser: {
          id: req.user.id,
          role: req.user.role
        },
        reviewOwner: review.userId
      });
    }

    const { description, rating } = req.body;
    await review.update({
      description,
      rating,
    });

    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a review (by admin or review author)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if user is admin or review author
    if (req.user.role !== "admin" && review.userId !== req.user.id) {
      return res.status(403).json({ 
        message: "Not authorized to delete this review",
        currentUser: {
          id: req.user.id,
          role: req.user.role
        },
        reviewOwner: review.userId
      });
    }

    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's reviews
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.user.id }, // From JWT token
      include: [
        {
          model: Movie,
          as: "movie",
          attributes: ["title"],
        },
      ],
    });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
