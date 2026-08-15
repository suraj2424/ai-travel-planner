import prisma from "../../infrastructure/database/prisma";
import type { Prisma } from "../../../generated/prisma/client";

class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data
    })
  }

}

export default UserRepository;
