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

  private async getOwnedTrip(tripId: string, userId: string) {
    const trip = await this.tripRepository.findById(tripId);
    if (!trip) throw new NotFoundError("TRIP_NOT_FOUND", "No trip found");
    if (trip.userId !== userId) throw new NotFoundError("TRIP_NOT_FOUND", "No trip found");
    return trip;
  }

  async getTripById(tripId: string, userId: string) {
    const trip = await this.getOwnedTrip(tripId, userId);
    return trip;
  }

  async updateTrip(tripId: string, userId: string, data: UpdateTripInput) {
    const trip = await this.getOwnedTrip(tripId, userId);
    const result = await this.tripRepository.update(trip.id, data);
    
    return result;
  }

  async deleteTrip(tripId: string, userId: string) {
    const trip = await this.getOwnedTrip(tripId, userId);
    const result = await this.tripRepository.delete(trip.id);
    
    return result;
  }
}

export default TripService;