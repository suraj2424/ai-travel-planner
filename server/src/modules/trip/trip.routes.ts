import { Router } from "express";
import validate from "../../shared/middleware/validate";
import createTripSchema, { tripIdSchema, updateTripSchema }  from "../../shared/validation/trip.schema";
import { tripController } from "./trip.dependencies";

const router = Router();

router.post("/trips", validate(createTripSchema), tripController.createTrip);

router.post("/trips/update", validate(updateTripSchema), tripController.updateTrip);

router.post("/trips/:id", validate(tripIdSchema, "params"), tripController.updateTrip);

router.get("/trips/:id", validate(tripIdSchema, "params"), tripController.findById);

router.get("/trips/:id", validate(tripIdSchema, "params"), tripController.deleteTrip);

router.get("/trips", tripController.listTrips);

export default router;