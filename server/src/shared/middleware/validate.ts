import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import BadRequestError from "../errors/BadRequestError";

type RequestPart = "body" | "params" | "query";

function validate(schema: ZodType, part: RequestPart = "body") {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse(req[part]);
    
    if (!result.success) {
      throw new BadRequestError(
        "VALIDATION_ERROR",
        "Invalid request data"
      );
    }
    
    res.locals.validated = result.data;
    
    next();
  }
}

export default validate;