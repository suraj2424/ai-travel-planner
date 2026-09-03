import { Router } from "express";
import validate from "../../shared/middleware/validate";
import createTripSchema, { listTripsSchema, parseTripPromptSchema, tripIdSchema, updateTripSchema } from "../../shared/validation/trip.schema";
import { tripController } from "./trip.dependencies";
import authenticateAccessToken from "../../shared/middleware/authenticate";

const router = Router();

router.use(authenticateAccessToken);

// POST /api/v1/trips/parse-prompt
router.post("/parse-prompt", validate(parseTripPromptSchema), tripController.parsePrompt);

// GET /api/v1/trips
router.get("/", validate(listTripsSchema, "query"), tripController.listTrips);

// POST /api/v1/trips
router.post("/", validate(createTripSchema), tripController.createTrip);

// GET /api/v1/trips/:id
router.get("/:id", validate(tripIdSchema, "params"), tripController.findById);

// PATCH /api/v1/trips/:id
router.patch("/:id", validate(tripIdSchema, "params"), validate(updateTripSchema), tripController.updateTrip);

// DELETE /api/v1/trips/:id
router.delete("/:id", validate(tripIdSchema, "params"), tripController.deleteTrip);

export default router;