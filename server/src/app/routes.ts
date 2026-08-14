import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  return res.json({
      "message": "This server is under development"
    })
});

router.get("/test-error", (req: Request, res: Response) => {
  throw new Error("Test Error");
})

export default router;