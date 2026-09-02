import { tripService } from "../trip/trip.dependencies";
import ItineraryController from "./itinerary.controller";
import LLMItineraryGenerator from "./itinerary.llm-generator";
import ItineraryRepository from "./itinerary.repository";
import ItineraryService from "./itinerary.service";
import GeoapifyProvider from "./providers/geoapify.provider";

export const itineraryRepository = new ItineraryRepository();

const travelDataProvider = new GeoapifyProvider();
const itineraryGenerator = new LLMItineraryGenerator(travelDataProvider);


export const itineraryService = new ItineraryService(
  tripService,
  itineraryRepository,
  itineraryGenerator
)

export const itineraryController = new ItineraryController(itineraryService);

