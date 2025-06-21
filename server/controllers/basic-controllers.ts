import { NextFunction, Request, Response } from "express";

// TESTING ROUTE FUNTION
export const TestRouteFunction = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Successful test.",
  });
};

// UNKNOWN ROUTE FUNTION
export const UnknownRouteFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  err.statusCode = 404;
  next(err);
};
