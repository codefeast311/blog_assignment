// lib/dbConnect.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;

const defaultConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    // If already connected, return the existing connection
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default defaultConnect;
