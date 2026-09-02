import { config } from "../../../config/env";
import type { TravelDataProvider, Place, RouteInfo } from "./travel-data.provider";

// Add these interfaces at the top of geoapify.provider.ts

interface GeoapifyFeature {
  properties: {
    name?: string;
    categories?: string[];
    details?: string;
    lat: number;
    lon: number;
  };
  geometry: {
    coordinates: [number, number]; // GeoJSON is always [lon, lat]
  };
}

interface GeoapifyPlacesResponse {
  features: GeoapifyFeature[];
}

interface GeoapifyGeocodeResponse {
  features: Array<{
    properties: {
      lat: number;
      lon: number;
    };
  }>;
}

interface GeoapifyRoutingResponse {
  features?: Array<{
    properties?: { summary?: { distance?: number; time?: number } };
  }>;
}


class GeoapifyProvider implements TravelDataProvider {
  private baseUrl = "https://api.geoapify.com";

  async getPlaces(destination: string, categories: string[]): Promise<Place[]> {
    const coords = await this.geocode(destination);
    if (!coords) return [];

    const url = new URL(`${this.baseUrl}/v2/places`);
    url.searchParams.set("categories", categories.join(","));
    url.searchParams.set("filter", `circle:${coords.lon},${coords.lat},10000`); // 10km radius
    url.searchParams.set("limit", "20");
    url.searchParams.set("apiKey", config.geoapify_api_key);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Geoapify places request failed");
    const data = (await res.json()) as GeoapifyPlacesResponse;

    return (data.features ?? [])
        .filter((f: any) => f.properties?.name)
        .map((f: any) => ({
          name: f.properties.name,
          category: f.properties?.categories?.[0] ?? "attraction",
          description: f.properties?.details ?? "",
          lat: f.properties?.lat ?? f.geometry?.coordinates?.[1] ?? 0,
          lon: f.properties?.lon ?? f.geometry?.coordinates?.[0] ?? 0,
        }));
  }

  private async geocode(
    destination: string,
  ): Promise<{ lat: number; lon: number } | null> {
    const url = new URL(`${this.baseUrl}/v1/geocode/search`);
    url.searchParams.set("text", destination);
    url.searchParams.set("limit", "1");
    url.searchParams.set("apiKey", config.geoapify_api_key);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Geoapify geocode request failed");
    const data = (await res.json()) as GeoapifyPlacesResponse;

    const first = data.features?.[0];
    if (!first) return null;
    return { lat: first.properties.lat, lon: first.properties.lon };
  }

  async getRoute(
    origin: { lat: number; lon: number },
    dest: { lat: number; lon: number },
  ): Promise<RouteInfo> {
    const mode = this.haversineKm(origin, dest) < 2 ? "walk" : "drive";
  
    const url = new URL(`${this.baseUrl}/v1/routing`);
    url.searchParams.set("waypoints", `${origin.lat},${origin.lon}|${dest.lat},${dest.lon}`);
    url.searchParams.set("mode", mode);
    url.searchParams.set("apiKey", config.geoapify_api_key);
  
    const res = await fetch(url);
    if (!res.ok) throw new Error("Geoapify routing request failed");
    const data = (await res.json()) as GeoapifyRoutingResponse;
  
    const summary = data.features?.[0]?.properties?.summary;
    let distanceKm = (summary?.distance ?? 0) / 1000;
    let durationMinutes = (summary?.time ?? 0) / 60;

    // Fallback if the routing response didn't give us usable numbers
    if (!distanceKm) {
      distanceKm = this.haversineKm(origin, dest);
      durationMinutes = mode === "walk" ? (distanceKm / 5) * 60 : (distanceKm / 30) * 60;
    }
    
    return {
      mode,
      durationMinutes: Math.round(durationMinutes),
      distanceKm: Math.round(distanceKm * 10) / 10,
    };
  }
  
  private haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLon = ((b.lon - a.lon) * Math.PI) / 180;
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
}

export default GeoapifyProvider;