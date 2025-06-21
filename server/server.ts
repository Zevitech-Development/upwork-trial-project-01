import "dotenv/config";

import { app } from "./app.ts";

import ConnectDB from "./databases/mongoose-database.ts";

const PORT = process.env.PORT || 8000;

process.on("uncaughtException", (error: Error) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(error.name, error.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(reason);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`Server is connected with port: ${PORT}`);
  ConnectDB();
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    process.exit(0);
  });
});
