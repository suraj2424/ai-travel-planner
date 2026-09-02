// src/modules/itinerary/providers/travel-data.provider.ts
export interface Place {
  name: string;
  category: string;
  description: string;
  lat: number;
  lon: number;
}

export interface RouteInfo {
  mode: string;
  durationMinutes: number;
  distanceKm: number;
}

export interface TravelDataProvider {
  getPlaces(destination: string, categories: string[]): Promise<Place[]>;
  getRoute(
    origin: { lat: number; lon: number },
    dest: { lat: number; lon: number },
  ): Promise<RouteInfo>;
}