import type { Prisma, Trip } from "../../../generated/prisma/client";
import prisma from "../../infrastructure/database/prisma";

class TripRepository {
  /**
   *  Create new trip
   */
  async create(data: Prisma.TripCreateInput): Promise<Trip> {
    return prisma.trip.create({ data });
  }

  /**
   *  Find trip by its ID
   */
  async findById(id: string): Promise<Trip | null> {
    return prisma.trip.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   *  Find trips of a User (Pagination)
   */
  async findByUserId(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
        },
      }),
      prisma.trip.count(),
    ]);

    return {
      trips,
      total,
    };
  }

  /**
   *   Update trip data
   */
  async update(id: string, data: Prisma.TripUpdateInput): Promise<Trip> {
    return prisma.trip.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Delete a trip
   */
  async delete(id: string): Promise<Trip> {
    return prisma.trip.delete({
      where: {
        id
      }
    })
  }

}

export default TripRepository;
