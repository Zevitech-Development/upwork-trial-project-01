import { NextFunction, Request, Response } from "express";

import { ErrorHandler } from "../utils/error-handler.ts";

export const AppErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Enhanced error logging for development
  if (process.env.NODE_ENV === "development") {
    console.error("🚨 Error Details:", {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      statusCode: err.statusCode,
    });
  }

  // WRONG MONGO-DB ID ERROR
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
    err = new ErrorHandler(message, 400);
  }

  // DUPLICATE KEY ERROR
  if (err.code === 11000) {
    const duplicateFields = Object.keys(err.keyValue);
    const message = `Duplicate field${
      duplicateFields.length > 1 ? "s" : ""
    }: ${duplicateFields.join(", ")}`;
    err = new ErrorHandler(message, 409);
  }

  // VALIDATION ERROR
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(", ");
    err = new ErrorHandler(message, 400);
  }

  // WRONG JWT ERROR
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid authentication token. Please login again";
    err = new ErrorHandler(message, 401);
  }

  // JWT EXPIRE ERROR
  if (err.name === "TokenExpiredError") {
    const message = "Authentication token expired. Please login again";
    err = new ErrorHandler(message, 401); // Changed to 401 Unauthorized
  }

  // MONGOOSE CONNECTION ERROR
  if (err.name === "MongooseServerSelectionError") {
    const message = "Database connection failed. Please try again later";
    err = new ErrorHandler(message, 503);
  }

  const responseMessage =
    process.env.NODE_ENV === "production" && err.statusCode === 500
      ? "Something went wrong. Please try again later"
      : err.message;

  res.status(err.statusCode).json({
    success: false,
    message: responseMessage,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
};
