import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  
  console.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details
      }
    });
  }
  
  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
  });
}

export default errorHandler;