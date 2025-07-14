

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected Succesfully')
  } catch (error) {
  console.log(`Datatbase Connection Error : ${error}`);
  process.exit(1);
  }
}

export default connectDB;