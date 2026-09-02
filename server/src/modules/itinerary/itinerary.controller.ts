import UnauthorizedError from "../../shared/errors/UnauthorizedError";
import type ItineraryService from "./itinerary.service";
import type { Request, Response } from "express";

class ItineraryController {
  constructor(
    private itineraryService: ItineraryService,
  ) { }

  private requireUserId(req: Request): string {
    if (!req.user?.id) {
      throw new UnauthorizedError("ACCESS_DENIED", "No session found");
    }
    return req.user.id;
  }

  generateItinerary = async (req: Request, res: Response) => {
    const userId = this.requireUserId(req);
    const { tripId } = res.locals.validated;

    const result = await this.itineraryService.generateItinerary(tripId, userId);

    return res.status(201).json({ data: result });
  }

  getItinerary = async (req: Request, res: Response) => {
    const userId = this.requireUserId(req);
    const { tripId } = res.locals.validated;

    const result = await this.itineraryService.getItinerary(tripId, userId);

    // result may be null (trip exists, no itinerary yet) — that's a valid 200.
    return res.status(200).json({ data: result });
  }
}

export default ItineraryController;