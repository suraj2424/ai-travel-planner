import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import BadRequestError from "../errors/BadRequestError";

function validate(schema: ZodType) {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse(req.body);

    if (result.success) {
      console.log("validation passed");
      next();
    } else {
      console.error("error validating request body");
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }));
      next(new BadRequestError("VALIDATION_ERROR", "Invalid Request Body",details))
    }
  }
}

export default validate;