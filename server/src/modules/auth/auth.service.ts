import BadRequestError from "../../shared/errors/BadRequestError";
import { verifyPassword } from "../../shared/security/password";
import { userRepository } from "../users/user.dependencies";

interface UserLoginRequestBody{
  email: string;
  password: string;
}

class AuthService{
  async loginUser(data: UserLoginRequestBody) {
    const fetchedUser = await userRepository.findUserByEmail(data.email);
    if (!fetchedUser) {
      throw new BadRequestError(
        "INVALID_CREDENTIALS",
        "Invalid email or password"
      );
    }

    if (fetchedUser.status !== "active") {
      throw new BadRequestError(
        "ACCOUNT_INACTIVE",
        "Account is not active"
      );
    }
    
    const result = await verifyPassword(data.password, fetchedUser.passwordHash);

    if (!result) {
      throw new BadRequestError(
        "INVALID_CREDENTIALS",
        "Invalid email or password"
      );
    }

    // const token = generateToken(fetchedUser.firstName, fetchedUser.lastName, fetchedUser.role);
    // return token;
  }
}

export default AuthService;