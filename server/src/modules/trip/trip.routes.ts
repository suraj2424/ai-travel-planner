import { Router } from "express";
import validate from "../../shared/middleware/validate";
import createTripSchema, { listTripsSchema, tripIdSchema, updateTripSchema }  from "../../shared/validation/trip.schema";
import { tripController } from "./trip.dependencies";

const router = Router();

router.post("/trips", validate(createTripSchema), tripController.createTrip);

router.post("/trips/:id", validate(tripIdSchema, "params"), validate(updateTripSchema), tripController.updateTrip);

router.get("/trips/:id", validate(tripIdSchema, "params"), tripController.findById);

router.delete("/trips/:id", validate(tripIdSchema, "params"), tripController.deleteTrip);

router.get("/trips", validate(listTripsSchema, "query"), tripController.listTrips);

export default router;