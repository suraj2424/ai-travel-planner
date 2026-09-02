import type {
  Prisma,
  ActivityCategory,
} from "../../../generated/prisma/client";
import prisma from "../../infrastructure/database/prisma";


export type ActivityInput = {
  title: string;
  description: string;
  category: ActivityCategory;
  time: Date;
  travelMode?: string; 
  travelMinutes?: number; 
  travelDistanceKm?: number;
};

export type DayInput = {
  dayNumber: number;
  date: Date;
  activities: ActivityInput[];
};

export type CreateItineraryInput = {
  tripId: string;
  days: DayInput[];
};

// The fully-hydrated read shape: itinerary + days + each day's activities.
export type ItineraryWithDaysAndActivities = Prisma.ItineraryGetPayload<{
  include: {
    days: {
      include: {
        activities: true;
      };
    };
  };
}>;

class ItineraryRepository {
  /**
   * Create the entire itinerary tree atomically:
   * Itinerary -> Days -> Activities in one nested create.
   */
  async createFullItinerary(input: CreateItineraryInput): Promise<ItineraryWithDaysAndActivities> {
    return prisma.itinerary.create({
      data: {
        tripId: input.tripId,
        status: "DRAFT", // content is present immediately, so DRAFT not GENERATING
        days: {
          create: input.days.map((day) => ({
            dayNumber: day.dayNumber,
            date: day.date,
            activities: {
              create: day.activities.map((activity) => ({
                title: activity.title,
                description: activity.description,
                category: activity.category,
                time: activity.time,
                travelMode: activity.travelMode,
                travelMinutes: activity.travelMinutes,
                travelDistanceKm: activity.travelDistanceKm,
              })),
            },
          })),
        },
      },
      include: {
        days: {
          include: {
            activities: true,
          },
        },
      },
    });
  }

  /**
   * Fetch the full itinerary for a trip, days ordered by dayNumber,
   * activities ordered by time. This is the exact shape the frontend renders.
   */
  async findByTripId(
    tripId: string,
  ): Promise<ItineraryWithDaysAndActivities | null> {
    return prisma.itinerary.findUnique({
      where: { tripId },
      include: {
        days: {
          orderBy: { dayNumber: "asc" },
          include: {
            activities: {
              orderBy: { time: "asc" },
            },
          },
        },
      },
    });
  }

  async replaceItinerary(
    tripId: string,
    input: CreateItineraryInput,
  ): Promise<ItineraryWithDaysAndActivities> {
    return prisma.$transaction(async (tx) => {
      // deleteMany (not delete): safe when no itinerary exists yet.
      // delete would throw; deleteMany just deletes zero rows.
      await tx.itinerary.deleteMany({ where: { tripId } });
  
      return tx.itinerary.create({
        data: {
          tripId,
          status: "DRAFT",
          days: {
            create: input.days.map((day) => ({
              dayNumber: day.dayNumber,
              date: day.date,
              activities: { create: day.activities },
            })),
          },
        },
        include: { days: { include: { activities: true } } },
      });
    });
  }
}

export default ItineraryRepository;