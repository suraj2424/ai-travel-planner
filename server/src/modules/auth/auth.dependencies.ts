import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import AuthRepository from "./auth.repository";
import { userRepository } from "../users/user.dependencies";

export const authRepository = new AuthRepository();
export const authService = new AuthService(userRepository, authRepository);
export const authController = new AuthController(authService);
