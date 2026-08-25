import { z } from "zod";
import { Interest, TravelStyle } from "../../../generated/prisma/enums";

const baseTripSchema = z.object({
  destination: z.string().min(1).max(50),
  travellers: z.coerce.number().int().min(1).max(50),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.coerce.number().int().positive().max(10000000).optional(),
  travelStyle: z.enum(TravelStyle).optional(),
  interests: z.array(z.enum(Interest)).max(10).optional(),
});

export const createTripSchema = baseTripSchema.refine(
  (data) => data.endDate >= data.startDate,
  {
    error: "End date must be after or equal to start date",
    path: ["endDate"],
  }
);

export default createTripSchema;

const updateTripBaseSchema = baseTripSchema.partial();

export const updateTripSchema = updateTripBaseSchema.refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.endDate >= data.startDate;
    }
    return true;
  },
  {
    error: "End date must be after or equal to start date",
    path: ["endDate"],
  }
);

export const tripIdSchema = z.object({
  id: z.uuid(),
});

export const listTripsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;