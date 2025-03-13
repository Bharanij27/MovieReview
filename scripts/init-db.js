const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  try {
    // Create connection without database selected
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created or already exists`);

    // Close the connection
    await connection.end();
    console.log('Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
