import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { AppErrorHandler } from "./middlewares/app-error-handler.ts";

import {
  TestRouteFunction,
  UnknownRouteFunction,
} from "./controllers/basic-controllers.ts";
import StaffRouter from "./routes/staff-routes.ts";

export const app = express();

app.disable("x-powered-by");

// SERVER CONFIGURATIONS
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN || [
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API ROUTES PATH
app.use("/api/staff", StaffRouter);
app.get("/test", TestRouteFunction);
app.all("*", UnknownRouteFunction);

// ERROR HANDLING MIDDLEWARE
app.use(AppErrorHandler);
