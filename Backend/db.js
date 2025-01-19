const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

const DB_URI = process.env.DB_URI;
const connectDatabase = () => {
  mongoose
    .connect(DB_URI)
    .then(console.log("MongoDB Connected to server"))
    .catch((err) => {
      console.log("Error in mongoDB connection : " + err);
    });
};

module.exports = connectDatabase;
