import { Router } from "express";
import type { Request, Response } from "express";
import testSchema from "../shared/validation/test.schema";
import validate from "../shared/middleware/validate";
import userRouter from "../modules/users/user.routes"

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  return res.json({
      "message": "This server is under development"
    })
});

router.post(
  "/test-validation",
  validate(testSchema),
  (req: Request, res: Response) => {
    return res.json({
      message: "Validation passed",
      data: req.body,
    });
  }
);

router.use(userRouter)



export default router;