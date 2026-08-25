import TripController from "./trip.controller";
import TripRepository from "./trip.repository";
import TripService from "./trip.service";

export const tripRepository = new TripRepository();
export const tripService = new TripService(tripRepository);
export const tripController = new TripController(tripService); 