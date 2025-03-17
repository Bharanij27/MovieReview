# Node.js Express App with MySQL

This project demonstrates creating a basic Node.js application using Express.js and connecting it to a MySQL database.

## Prerequisites

Before starting, ensure you have installed:

- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://dev.mysql.com/downloads/mysql/)

## Project Setup

### Initialize the Project

```bash
mkdir movieReview
cd movieReview
npm init -y
```

### Install Required Dependencies

```bash
npm install express mysql2 dotenv
npm install nodemon --save-dev
```

- **express:** Web framework for Node.js
- **mysql2:** MySQL database driver
- **dotenv:** Manage environment variables securely
- **nodemon:** Automatically restart the server on code changes

### Directory Structure

```
node-express-mysql/
├── node_modules
├── config
│   └── db.js
├── routes
│   └── users.js
├── controllers
│   └── userController.js
├── .env
├── package.json
└── server.js
```

## Environment Variables

Create a `.env` file in the root directory and define database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=my_database
PORT=3000
```



## Run the Server

Add scripts to `package.json`:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "dev": "nodemon app.js",
    "initialize": "npx sequelize-cli migration:generate --name init",
    "build": "npm install && npx sequelize-cli db:migrate"
  },
```

Start the server:

```bash
npm run start
```

## Test the API

Use a tool like Postman  to test your endpoints:

### Users API
- `POST http://localhost:3000/api/auth/register`
Request Body:
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
}
```
Response (201):
```json
{
    "message": "User registered successfully",
    "user": {
        "id": number,
        "email": "string",
        "username": "string",
        "role": "string"
    }
}
```

- `POST http://localhost:3000/api/auth/login`
Request Body:
```json
{
    "email": "string",
    "password": "string"
}
```
Response (201):
```json
{
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "user": {
        "id": number,
        "email": "string",
        "username": "string",
        "role": "string"
    }
}
```
- `GET http://localhost:3000/api/movies`
Response (201):
```json
[
    {
        "id": number,
        "title": "string",
        "description": "string",
        "releaseYear": number,
        "genre": "string",
        "director": "string",
        "imageUrl": "string" (optional)
    }
]
```

- `GET http://localhost:3000/api/movies/:id`

### Movie API
## Conclusion

This setup provides a structured and maintainable Node.js application using Express.js with a robust MySQL backend, suitable for building scalable APIs.

