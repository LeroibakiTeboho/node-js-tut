const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI); // No need for deprecated options
  } catch (err) {
    console.error("Database Connection Error:", err);
  }
};

module.exports = connectDB;
