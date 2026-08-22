import { z } from "zod";
import { Interest, TravelStyle } from "../../../generated/prisma/enums";

const createTripSchema = z.object({
  destination: z.string().min(1).max(50),
  travellers: z.coerce.number().int().min(1).max(50),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  budget: z.coerce.number().int().positive().max(10000000).optional(),
  travelStyle: z.enum(TravelStyle).optional(),
  interests: z.array(z.enum(Interest)).max(10).optional(),
}).refine((data) => data.endDate >= data.startDate, {
  error: "End date must be after or equal to start date",
  path: ["endDate"]
});

export const updateTripSchema = createTripSchema.partial().refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.endDate >= data.startDate;
    }
    return true;
  },
  {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  }
);

export const tripIdSchema = z.object({
  id: z.uuid(),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;