import prisma from "../../infrastructure/database/prisma";
import type { Prisma } from "../../../generated/prisma/client";

class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async getAllUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        }
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      total
    }
  
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}

export default UserRepository;
