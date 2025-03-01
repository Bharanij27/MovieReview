const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected & synchronized.");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.error("Database connection error:", error));
