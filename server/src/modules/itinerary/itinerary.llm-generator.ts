import { generateText, Output, zodSchema } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import type { Trip } from "../../../generated/prisma/client";
import type { ItineraryGenerator, GeneratedDay, GeneratedActivity } from "./itinerary.generator";
import AppError from "../../shared/errors/AppError";
import type { TravelDataProvider, Place } from "./providers/travel-data.provider";

// Schema for what the LLM returns
const llmActivitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["SIGHTSEEING", "MEAL", "TRANSPORT", "ACCOMMODATION", "EXPERIENCE"]),
  slot: z.enum(["breakfast", "morning", "lunch", "afternoon", "evening", "dinner"]),
});

const llmDaySchema = z.object({
  activities: z.array(llmActivitySchema).min(1),
});

const llmItinerarySchema = z.object({
  days: z.array(llmDaySchema).min(1),
});



class LLMItineraryGenerator implements ItineraryGenerator {
  constructor(
    private travelDataProvider: TravelDataProvider,
  ) { }

  private static readonly SLOT_TIMES: Record<string, [number, number]> = {
    breakfast: [8, 0],
    morning: [10, 0],
    lunch: [13, 0],
    afternoon: [15, 30],
    evening: [18, 0],
    dinner: [19, 30],
  };
  
  private combineSlot(date: Date, slot: string): Date {
    const [h, m] = LLMItineraryGenerator.SLOT_TIMES[slot] ?? [12, 0];
    const d = new Date(date);
    d.setUTCHours(h, m, 0, 0);
    return d;
  }

  private async fetchRealPlaces(destination: string): Promise<Place[]> {
    try {
      return await this.travelDataProvider.getPlaces(destination, [
        "tourism",
        "catering",
        "accommodation",
      ]);
    } catch (error) {
      return [];
    }
  }

  async generate(trip: Trip): Promise<GeneratedDay[]> {
    const totalDays = this.dayCount(trip.startDate, trip.endDate);
    const realPlaces = await this.fetchRealPlaces(trip.destination);

    let parsedObject: z.infer<typeof llmItinerarySchema>;
    try {
      const { output } = await generateText({
        model: groq("openai/gpt-oss-120b"),
        output: Output.object({ schema: zodSchema(llmItinerarySchema) }),
        prompt: this.buildPrompt(trip, totalDays, realPlaces),
      });
      parsedObject = output;
    } catch (error) {
      throw new AppError(502, "ITINERARY_GENERATION_FAILED", "Could not generate the itinerary. Please try again.");
    }

    // 1. Map LLM output to domain shape with real dates
    const days: GeneratedDay[] = parsedObject.days.slice(0, totalDays).map((day, i) => {
      const date = this.addDays(trip.startDate, i);
      return {
        dayNumber: i + 1,
        date,
        activities: day.activities.map((activity) => ({
          title: activity.title,
          description: activity.description,
          category: activity.category,
          time: this.combineSlot(date, activity.slot),
        })),
      };
    });

    // 2. Enrich with travel legs AFTER generation (graceful degradation)
    try {
      await this.attachTravelLegs(days, realPlaces);
    } catch {
      // Travel legs are enhancement — never fail generation
    }

    return days;
  }

  private findPlace(title: string, places: Place[]): Place | null {
    const t = title.toLowerCase();
    return places.find((p) => t.includes(p.name.toLowerCase())) ?? null;
  }

  private async attachTravelLegs(days: GeneratedDay[], realPlaces: Place[]): Promise<void> {
    const pairs: { activity: GeneratedActivity; from: Place; to: Place }[] = [];

    // Collect consecutive activity pairs per day
    for (const day of days) {
      const coords = day.activities.map((a) => this.findPlace(a.title, realPlaces));
      for (let i = 1; i < day.activities.length; i++) {
        const from = coords[i - 1];
        const to = coords[i];
        if (from && to) {
          // Skip routing if the LLM reused the exact same place
          if (from.name === to.name) continue;
          pairs.push({ activity: day.activities[i]!, from, to });
        }
      }
    }

    // Parallel routing calls
    const legs = await Promise.all(
      pairs.map((p) =>
        this.travelDataProvider
          .getRoute({ lat: p.from.lat, lon: p.from.lon }, { lat: p.to.lat, lon: p.to.lon })
          .catch(() => null),
      ),
    );

    // Attach travel info to activities
    pairs.forEach((p, i) => {
      const leg = legs[i];
      if (leg) {
        p.activity.travelMode = leg.mode;
        p.activity.travelMinutes = leg.durationMinutes;
        p.activity.travelDistanceKm = leg.distanceKm;
      }
    });
  }

  private buildPrompt(trip: Trip, totalDays: number, realPlaces: Place[]): string {
    const attractions = realPlaces.filter((p) => p.category.startsWith("tourism"));
    const food = realPlaces.filter((p) => p.category.startsWith("catering"));
    const hotels = realPlaces.filter((p) => p.category.startsWith("accommodation"));

    const list = (places: Place[]) =>
      places.length ? places.map((p) => `- ${p.name}`).join("\n") : "(none available)";

    const realPlacesSection = realPlaces.length
      ? `
VERIFIED REAL PLACES IN ${trip.destination.toUpperCase()} (use these exact names whenever possible):

Attractions:
${list(attractions)}

Restaurants & cafes:
${list(food)}

Hotels:
${list(hotels)}
`
      : "";

    return `You are an expert travel planner. Create a detailed ${totalDays}-day itinerary for a trip to ${trip.destination}.

Trip details:
- Destination: ${trip.destination}
- Number of travellers: ${trip.travellers}
- Budget: ${trip.budget ? `₹${trip.budget} total for the whole trip` : "not specified"}
- Travel style: ${trip.travelStyle ?? "balanced"}
- Interests: ${trip.interests.length ? trip.interests.join(", ") : "general sightseeing"}
${realPlacesSection}
Requirements:
- Return exactly ${totalDays} days.
- Each day should have 4-6 activities spread across the day, morning to evening.
- For each activity, set a "slot" field (NOT a clock time): one of breakfast, morning, lunch, afternoon, evening, dinner.
- Order activities logically through the day (breakfast first, dinner last).
- DO NOT reuse the same exact restaurant or hotel for Breakfast, Lunch, and Dinner. Pick DIFFERENT real places from the provided list for each meal.
- On day 1, include one ACCOMMODATION activity (hotel check-in) using a real hotel from the list.
- Times MUST be strictly in 24-hour format (e.g., 08:00, 13:00, 19:30).
- Order activities logically by time within each day.`;
  }

  private dayCount(start: Date, end: Date): number {
    const ms = end.getTime() - start.getTime();
    return Math.max(1, Math.floor(ms / 86_400_000) + 1);
  }

  private addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setUTCDate(d.getUTCDate() + days);
    return d;
  }
}

export default LLMItineraryGenerator;