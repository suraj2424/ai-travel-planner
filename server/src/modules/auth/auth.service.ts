import { OAuth2Client } from "google-auth-library";
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
  private googleClient = new OAuth2Client(config.google_client_id);

  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  private async getUserById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError("USER_NOT_FOUND", "User not found");
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
  }

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

    if (!fetchedUser.passwordHash) {
      throw new BadRequestError(
        "INVALID_CREDENTIALS",
        "This account was registered with Google. Please use Google Sign In.",
      );
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
      accessToken: access_token,
      refreshToken: modified_refresh_token,
      user: {
        id: fetchedUser.id,
        firstName: fetchedUser.firstName,
        lastName: fetchedUser.lastName,
        email: fetchedUser.email
      }
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

    if (currentSession.expiresAt.getTime() <= Date.now()) {
      // return error unauthorized
      throw new UnauthorizedError(
        "REFRESH_TOKEN_EXPIRED",
        "Refresh Token Expired",
      );
    } else {
      
      const new_token = await generateAccessToken(currentSession.userId);
      const user = await this.getUserById(currentSession.userId);
      return {
        accessToken: new_token,
        refreshToken: refresh_token,
        user,
      };
    }
  }

  async loginWithGoogle(idToken: string) {
    if (!idToken) {
      throw new BadRequestError("INVALID_TOKEN", "Google ID token is required");
    }

    let payload;
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: config.google_client_id,
      });
      payload = ticket.getPayload();
    } catch (err) {
      throw new UnauthorizedError(
        "INVALID_GOOGLE_TOKEN",
        "Failed to verify Google token",
      );
    }

    if (!payload || !payload.email) {
      throw new UnauthorizedError(
        "INVALID_GOOGLE_TOKEN",
        "Google token payload missing email",
      );
    }

    const { email, sub: googleId, given_name, family_name, picture } = payload;

    type AuthUser = {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
      status: string;
    };

    let user: AuthUser | null = null;

    // 1. Check if user already exists with this Google ID
    const existingGoogleUser = await this.userRepository.findUserByGoogleId(googleId);

    if (existingGoogleUser) {
      user = existingGoogleUser;
    } else {
      // 2. Check if user already exists with this email
      const existingEmailUser = await this.userRepository.findUserByEmail(email);

      if (existingEmailUser) {
        // Link Google ID and avatar if missing
        user = await this.userRepository.update(existingEmailUser.id, {
          googleId,
          ...(picture && !existingEmailUser.avatarUrl ? { avatarUrl: picture } : {}),
        });
      } else {
        // 3. Create a new user
        user = await this.userRepository.create({
          email,
          firstName: given_name || "Traveler",
          lastName: family_name || "",
          googleId,
          avatarUrl: picture,
          status: "active",
        });
      }
    }

    if (!user) {
      throw new BadRequestError("AUTH_FAILED", "Failed to authenticate user");
    }

    if (user.status !== "active") {
      throw new BadRequestError("ACCOUNT_INACTIVE", "Account is not active");
    }

    // 4. Create standard session and tokens
    const access_token = await generateAccessToken(user.id);
    const refresh_token = generateRefreshToken();
    const refresh_token_hash = await hashPassword(refresh_token);
    const refresh_token_expiry = config.refresh_token_expires_in;
    const expiresAt = new Date(
      Date.now() + refresh_token_expiry * 24 * 60 * 60 * 1000,
    );

    const session = await this.authRepository.createSession(
      user.id,
      refresh_token_hash,
      expiresAt,
    );

    const modified_refresh_token = `${session.id}.${refresh_token}`;

    return {
      accessToken: access_token,
      refreshToken: modified_refresh_token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarUrl: user.avatarUrl ?? null,
      },
    };
  }
}

export default AuthService;
