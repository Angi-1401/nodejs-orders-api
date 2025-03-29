import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Setup the url to establish connection to the database
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Connect to the database
mongoose.connect(url, {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Database connected!");
});

export default db;