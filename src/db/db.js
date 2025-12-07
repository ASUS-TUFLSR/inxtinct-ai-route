import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
}
