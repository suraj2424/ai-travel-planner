import BadRequestError from "../../shared/errors/BadRequestError";
import NotFoundError from "../../shared/errors/NotFoundError";
import UnauthorizedError from "../../shared/errors/UnauthorizedError";
import { hashPassword } from "../../shared/security/password";
import type { CreateUserInput, UpdateUserInput } from "../../shared/validation/user.schema";
import UserRepository from "./user.repository";

class UserService {
  constructor(
    private userRepository: UserRepository
  ) { }

  async createUser(data: CreateUserInput) {
    const pswd_hash = await hashPassword(data.password);
    const result = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash: pswd_hash
    }
    return this.userRepository.create(result);
  }

  async updateUser(userId: string, data: UpdateUserInput) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError("ACCESS_DENIED", "No session found!")
    }
    const result = await this.userRepository.update(userId, data);

    if (!result) {
      throw new BadRequestError("INVALID_INFORMATION", "Missing required fields");
    }

    return result;
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