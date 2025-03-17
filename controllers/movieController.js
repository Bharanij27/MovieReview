const Movie = require("../models/Movie");

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      where: {
        isDeleted: false
      },
    });
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching movies", error: error.message });
  }
};

// Get single movie
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      where: {
        id: req.params.id,
        isDeleted: false
      }
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create movie (admin only)
exports.createMovie = async (req, res) => {
  try {
    const { title, description, releaseYear, genre, director, imageUrl } = req.body;
    const movie = await Movie.create({
      title,
      description,
      releaseYear,
      genre,
      director,
      imageUrl,
    });
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update movie (admin only)
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const { title, description, releaseYear, genre, director, imageUrl } = req.body;
    await movie.update({
      title,
      description,
      releaseYear,
      genre,
      director,
      imageUrl,
    });

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete movie (admin only)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (movie.isDeleted) {
      return res.status(400).json({ message: "Movie is already deleted" });
    }
    await movie.update({
      isDeleted: true,
      deletedAt: new Date()
    });
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
