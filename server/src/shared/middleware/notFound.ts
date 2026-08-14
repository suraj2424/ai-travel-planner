import type { Request, Response, NextFunction } from "express";

function notFound(req: Request, res: Response, next: NextFunction) {
  return res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: "Route not found"
    }
  });
}

export default notFound;