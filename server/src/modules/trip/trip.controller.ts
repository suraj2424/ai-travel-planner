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
    const data = res.locals.validated;
    const result = await this.tripService.createTrip(userId, data);
    return res.status(201).json({
      data: result
    })
  }

  listTrips = async (req: Request, res: Response) => {
    const { page, limit } = res.locals.validated;
    const userId = this.requireUserId(req);
    const { trips, total } = await this.tripService.listTrips(userId, page, limit);
    return res.status(200).json({
      data: trips,
      meta: {
        page,
        limit,
        total: total
      }
    })
  }

  updateTrip = async (req: Request, res: Response) => {
    const data = res.locals.validated;
    const userId = this.requireUserId(req);
    const tripId = req.params.id as string;
    const result = await this.tripService.updateTrip(tripId, userId, data);
    return res.status(200).json({ data: result });
  }

  

  findById = async (req: Request, res: Response) => { 
    const userId = this.requireUserId(req);
    const tripId = req.params.id as string;
    
    const result = await this.tripService.getTripById(tripId, userId);

    return res.status(200).json({
      data: result
    });
  }

  deleteTrip = async (req: Request, res: Response) => {
    const tripId = req.params.id as string;
    const userId = this.requireUserId(req);
    
    await this.tripService.deleteTrip(tripId, userId);

    return res.status(204).send();
  }
}

export default TripController;