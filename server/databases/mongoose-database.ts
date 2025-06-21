import "dotenv/config";

import mongoose from "mongoose";

const DatabaseUrl = process.env.MONGOOSE_DATABASE_URL || "";

const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(DatabaseUrl, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `✅ Database connected successfully: ${connection.connection.host}`
    );

    mongoose.connection.on("error", (error) => {
      console.error("❌ Database connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Database disconnected");
    });
  } catch (error: any) {
    console.error(`❌ Database connection failed: ${error.message}`);
    console.log("🔄 Retrying connection in 5 seconds...");
    setTimeout(ConnectDB, 5000);
  }
};

export default ConnectDB;
