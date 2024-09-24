import mongoose from "mongoose";

export async function dbConnect() {
  if (!process.env.NEXT_PUBLIC_MONGODB_CONNECTION_STRING ) {
    throw new Error("MONGODB_CONNECTION_STRING is not defined");
  }

  try {
    const conn = await mongoose.connect(String(process.env.NEXT_PUBLIC_MONGODB_CONNECTION_STRING));
    console.log("MongoDB connected successfully");
    return conn;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
