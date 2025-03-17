const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1888, // First movie ever made
      max: new Date().getFullYear(),
    },
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  deletedAt:{
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Movie;
