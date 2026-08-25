import prisma from "../../infrastructure/database/prisma";
import type { Prisma, User } from "../../../generated/prisma/client";

class UserRepository {
  /**
   * 
   * @param data 
   * 
   */
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

  /**
   * Update user info
   * @param id 
   * @param data
   */
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  /**
   * Find user by :ID
   * @param id 
   */
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        trips: true,
        createdAt: true,
        updatedAt: true,
      }
    })
  }
  
  /**
   * Get all users
   * @param page 
   * @param limit
   */
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
  /**
   * Find User by email address
   * @param email 
   */
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}

export default UserRepository;
