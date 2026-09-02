import type { Trip, ActivityCategory } from "../../../generated/prisma/client";

export type GeneratedActivity = {
  title: string;
  description: string;
  category: ActivityCategory;
  time: Date;
  travelMode?: string;
  travelMinutes?: number;
  travelDistanceKm?: number;
};

export type GeneratedDay = {
  dayNumber: number;
  date: Date;
  activities: GeneratedActivity[];
};

// The seam: anything that can turn a Trip into itinerary content.
export interface ItineraryGenerator {
  generate(trip: Trip): Promise<GeneratedDay[]>;
}

class MockItineraryGenerator implements ItineraryGenerator {
  async generate(trip: Trip): Promise<GeneratedDay[]> {
    const days: GeneratedDay[] = [];
    const totalDays = this.dayCount(trip.startDate, trip.endDate);

    for (let i = 0; i < totalDays; i++) {
      const date = this.addDays(trip.startDate, i);
      days.push({
        dayNumber: i + 1,
        date,
        activities: this.buildActivities(trip.destination, date, i),
      });
    }
    return days;
  }

  private buildActivities(
    destination: string,
    date: Date,
    dayIndex: number,
  ): GeneratedActivity[] {
    return [
      { title: `Breakfast in ${destination}`, description: "Start the day with a local breakfast.", category: "MEAL", time: this.atTime(date, 8) },
      { title: `Morning in ${destination}`, description: "Visit a top sight to kick off the day.", category: "SIGHTSEEING", time: this.atTime(date, 10) },
      { title: "Lunch", description: "Lunch at a well-reviewed spot.", category: "MEAL", time: this.atTime(date, 13) },
      { title: "Afternoon experience", description: "An activity matched to your interests.", category: "EXPERIENCE", time: this.atTime(date, 15) },
      { title: "Dinner", description: `Wind down day ${dayIndex + 1} with dinner.`, category: "MEAL", time: this.atTime(date, 19) },
    ];
  }

  private dayCount(start: Date, end: Date): number {
    const ms = end.getTime() - start.getTime();
    return Math.max(1, Math.floor(ms / 86_400_000) + 1); // inclusive of both dates
  }

  private addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setUTCDate(d.getUTCDate() + days);
    return d;
  }

  private atTime(date: Date, hour: number): Date {
    const d = new Date(date);
    d.setUTCHours(hour, 0, 0, 0);
    return d;
  }
}

export default MockItineraryGenerator;