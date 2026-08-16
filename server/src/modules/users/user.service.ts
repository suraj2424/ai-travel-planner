import type { Prisma } from "../../../generated/prisma/client";
import NotFoundError from "../../shared/errors/NotFoundError";
import { hashPassword } from "../../shared/security/password";
import UserRepository from "./user.repository";

interface CreateUserRequestBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

class UserService {
  constructor(
    private userRepository: UserRepository
  ) { }

  async createUser(data: CreateUserRequestBody) {
    const pswd_hash = await hashPassword(data.password);
    const result = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash: pswd_hash
    }
    return this.userRepository.create(result);
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
        throw new NotFoundError(
          "USER_NOT_FOUND",
          "User not found"
        );
    }
    return user;
  }

  async getAllUsers(page: number, limit: number) {
    const result = await this.userRepository.getAllUsers(page,limit);
    if (!result.users) {
      throw new NotFoundError(
        "USERS_NOT_FOUND",
        "No users created"
      );
    }
    return result;
  }
}

export default UserService;