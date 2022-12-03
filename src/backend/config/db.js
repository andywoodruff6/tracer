import mongoose from "mongoose";
// import path from 'path';
import {} from "dotenv/config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("====================");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export default connectDB;
