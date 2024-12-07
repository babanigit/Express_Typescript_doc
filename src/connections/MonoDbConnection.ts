// db.ts

import mongoose from "mongoose";

const connectMongoDb = async (): Promise<void> => {
  const DB: string | undefined = process.env.DATABASEMONGO;

  if (!DB) {
    throw new Error("Database connection string is not provided.");
  }

  try {
    const connect = await mongoose.connect(DB);
    console.log(
      "MongoDB Database connected:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("Failed to connect to the database.");
    console.error(error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectMongoDb;
