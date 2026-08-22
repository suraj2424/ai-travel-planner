import TripRepository from "./trip.repository";
import type { CreateTripInput, UpdateTripInput } from "../../shared/validation/trip.schema";
import NotFoundError from "../../shared/errors/NotFoundError";

class TripService {
  constructor(
    private tripRepository: TripRepository
  ) { }

  async createTrip(userId: string, data: CreateTripInput) {
    const result = await this.tripRepository.create({
      ...data,
      user: { connect: { id: userId } },
    });

    return result;
  }

  async listTrips(userId: string, page: number, limit: number) {
    const result = await this.tripRepository.findByUserId(userId, page, limit);
    
    return result;
  }

  async getTripById(tripId: string, userId: string) {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) {
      throw new NotFoundError(
        "TRIP_NOT_FOUND",
        "No trip found"
      );
    }
    
    if (trip.userId !== userId) {
      throw new NotFoundError(
        "TRIP_NOT_FOUND",
        "No trip found"
      );
    }

    return trip;
  }

  async updateTrip(tripId: string, userId: string, data: UpdateTripInput) {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) {
      throw new NotFoundError(
        "TRIP_NOT_FOUND",
        "No trip found"
      );
    }
    
    if (trip.userId !== userId) {
      throw new NotFoundError(
        "TRIP_NOT_FOUND",
        "No trip found"
      );
    }
    const result = await this.tripRepository.update(tripId, data);
    if (!result) {
      throw new NotFoundError(
        "TRIP_NOT_FOUND",
        "No trip found"
      );
    }
    return result;
  }

  async deleteTrip(tripId: string, userId: string) {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) {
      throw new NotFoundError(
        "TRIP_NOT_FOUND",
        "No trip found"
      );
    }
    
    if (trip.userId !== userId) {
      throw new NotFoundError(
        "TRIP_NOT_FOUND",
        "No trip found"
      );
    }
    const result = await this.tripRepository.delete(tripId);
    if (!result) {
      throw new NotFoundError(
        "TRIP_NOT_FOUND",
        "No trip found"
      );
    }
    return result;
  }
}

export default TripService;