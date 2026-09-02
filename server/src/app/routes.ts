import { Router } from "express";
import type { Request, Response } from "express";
import userRouter from "../modules/users/user.routes"
import authRouter from "../modules/auth/auth.routes";
import tripRouter from "../modules/trip/trip.routes";
import itineraryRouter from "../modules/itinerary/itinerary.routes"

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  return res.json({
      "message": "This server is under development"
    })
});

router.use(userRouter);
router.use(authRouter);
router.use("/trips", tripRouter);
router.use("/itineraries", itineraryRouter);



export default router;