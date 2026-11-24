import mongoose from "mongoose";

export const connectDB = async () => {
  const connectionString = process.env.DB_CONNECTION_URL;

  if (!connectionString) {
    throw new Error("DB_CONNECTION_URL is not configured");
  }

  try {
    await mongoose.connect(connectionString);
    console.log("DB Connection Successful");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    throw err;
  }
};