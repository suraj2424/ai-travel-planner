import { Router } from "express"; // adjust path to your validate middleware
import { itineraryController } from "./itinerary.dependencies";
import { tripIdParamSchema } from "../../shared/validation/itinerary.schema";
import validate from "../../shared/middleware/validate";
import authenticateAccessToken from "../../shared/middleware/authenticate";

const router = Router();

router.use(authenticateAccessToken);

// POST /api/v1/itineraries/generate/:tripId
router.post("/generate/:tripId", validate(tripIdParamSchema, "params"),
  itineraryController.generateItinerary,
);

// GET /api/v1/itineraries/:tripId
router.get("/:tripId", validate(tripIdParamSchema, "params"),
  itineraryController.getItinerary,
);

export default router;
