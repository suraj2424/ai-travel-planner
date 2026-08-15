import type { Prisma } from "../../../generated/prisma/client";
import UserRepository from "./user.repository";

class UserService {
  constructor(
    private userRepository: UserRepository
  ) { }

  async createUser(data: Prisma.UserCreateInput) {
    return this.userRepository.create(data);
  }
}

export default UserService;