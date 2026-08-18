import { config } from "../../config/env";
import BadRequestError from "../../shared/errors/BadRequestError";
import UnauthorizedError from "../../shared/errors/UnauthorizedError";
import { hashPassword, verifyPassword } from "../../shared/security/password";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../shared/security/token";
import type UserRepository from "../users/user.repository";
import type AuthRepository from "./auth.repository";

interface UserLoginRequestBody {
  email: string;
  password: string;
}

class AuthService {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async loginUser(data: UserLoginRequestBody) {
    const fetchedUser = await this.userRepository.findUserByEmail(data.email);
    if (!fetchedUser) {
      throw new BadRequestError(
        "INVALID_CREDENTIALS",
        "Invalid email or password",
      );
    }

    if (fetchedUser.status !== "active") {
      throw new BadRequestError("ACCOUNT_INACTIVE", "Account is not active");
    }

    const result = await verifyPassword(
      data.password,
      fetchedUser.passwordHash,
    );

    if (!result) {
      throw new BadRequestError(
        "INVALID_CREDENTIALS",
        "Invalid email or password",
      );
    }

    const access_token = await generateAccessToken(fetchedUser.id);
    const refresh_token = generateRefreshToken();
    const refresh_token_hash = await hashPassword(refresh_token);
    const refresh_token_expiry = config.refresh_token_expires_in;
    const expiresAt = new Date(
      Date.now() + refresh_token_expiry * 24 * 60 * 60 * 1000,
    );

    const session = await this.authRepository.createSession(
      fetchedUser.id,
      refresh_token_hash,
      expiresAt,
    );

    const modified_refresh_token = `${session.id}.${refresh_token}`;

    const responseData = {
      token: access_token,
      refresh_token: modified_refresh_token,
    };

    return responseData;
  }

  async createNewAccessToken(refresh_token: string) {
    const [sessionId, clientRefreshToken] = refresh_token.split(".");

    if (!sessionId || !clientRefreshToken) {
      throw new BadRequestError(
        "INVALID_REFRESH_TOKEN",
        "Invalid refresh token",
      );
    }

    const currentSession =
      await this.authRepository.findSessionBySessionID(sessionId);

    if (!currentSession) {
      throw new UnauthorizedError(
        "INVALID_REFRESH_TOKEN",
        "Invalid refresh token",
      );
    }

    const refreshTokenVerification = await verifyPassword(
      clientRefreshToken,
      currentSession.refreshTokenHash,
    );

    if (!refreshTokenVerification) {
      throw new UnauthorizedError(
        "INVALID_REFRESH_TOKEN",
        "Invalid refresh token",
      );
    }

    if (Date.now() < currentSession.expiresAt.getTime()) {
      const new_token = await generateAccessToken(currentSession.userId);
      return {
        token: new_token,
        refresh_token: refresh_token,
      };
    } else {
      // return error unauthorized
      throw new UnauthorizedError(
        "REFRESH_TOKEN_EXPIRED",
        "Refresh Token Expired",
      );
    }
  }
}

export default AuthService;
