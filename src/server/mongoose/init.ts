import Mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env
  .MONGO_PASSWORD}@users.bwkwwrj.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDB(): Promise<boolean> {
  try {
    await Mongoose.connect(connectionString, {});
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", (error as any).message);
    return false;
  }
}
