const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Movie = require("./Movie");

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Movie,
      key: "id",
    },
  },
});

// Define relationships
Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Movie.hasMany(Review, { foreignKey: "movieId", as: "reviews" });

module.exports = Review;
