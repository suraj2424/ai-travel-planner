import type TripService from "../trip/trip.service";
import type ItineraryRepository from "./itinerary.repository";
import type { ItineraryGenerator } from "./itinerary.generator";

class ItineraryService {
  constructor(
    private tripService: TripService,
    private itineraryRepository: ItineraryRepository,
    private generator: ItineraryGenerator,
  ) {}

  async generateItinerary(tripId: string, userId: string) {
    // Throws NotFoundError if the trip doesn't exist or isn't owned by userId.
    const trip = await this.tripService.getTripById(tripId, userId);

    // The seam: today this is the mock, later it's the LLM.
    const days = await this.generator.generate(trip);

    return this.itineraryRepository.replaceItinerary(tripId, { tripId, days });
  }

  async getItinerary(tripId: string, userId: string) {
    // Ownership check before reading someone's itinerary.
    await this.tripService.getTripById(tripId, userId);
    return this.itineraryRepository.findByTripId(tripId);
  }
}

export default ItineraryService;