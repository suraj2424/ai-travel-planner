import BadRequestError from "../../shared/errors/BadRequestError";
import UnauthorizedError from "../../shared/errors/UnauthorizedError";
import type TripService from "./trip.service";
import type { Request, Response } from "express";

class TripController {
  constructor(
    private tripService: TripService,
  ) { }

  private requireUserId(req: Request): string {
    if (!req.user?.id) {
      throw new UnauthorizedError("ACCESS_DENIED", "No session found");
    }
    return req.user.id;
  }

  createTrip = async (req: Request, res: Response) => {
    const userId = this.requireUserId(req);
    const result = await this.tripService.createTrip(userId, req.body);
    
    return res.status(201).json({
      result
    })
  }

  listTrips = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const userId = this.requireUserId(req);
    const { trips, total } = await this.tripService.listTrips(userId, Number(page), Number(limit));
    return res.status(200).json({
      data: trips,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: total
      }
    })
  }

  updateTrip = async (req: Request, res: Response) => {
    const data = req.body;
    if (!req.user || !req.user.id) {
      throw new UnauthorizedError("ACCESS_DENIED", "No Session Found");
    }
    const tripId = req.params.tripId;
    if (!tripId || Array.isArray(tripId)) {
      throw new BadRequestError("MISSING_REQUIRED_FIELDS", "Missing Information");
    }
    const result = await this.tripService.updateTrip(tripId, req.user.id, data);
    return res.status(200).json({ result });
  }

  

  findById = async (req: Request, res: Response) => { 
    const tripId = req.params.tripId;
    if (!req.user || !req.user.id) {
      throw new UnauthorizedError("ACCESS_DENIED", "No Session Found");
    }
    const result = await this.tripService.getTripById(tripId, req.user.id);

    return res.status(200).json({
      result
    });
  }

  deleteTrip = async (req: Request, res: Response) => {
    const tripId = req.params.tripId;
    if (!tripId || Array.isArray(tripId)) {
      throw new BadRequestError("MISSING_REQUIRED_FIELDS", "Invalid trip ID");
    }
    if (!req.user || !req.user.id) {
      throw new UnauthorizedError("ACCESS_DENIED", "No Session Found");
    }
    const result = await this.tripService.deleteTrip(tripId, req.user.id);

    return res.status(204);
  }
}

export default TripController;