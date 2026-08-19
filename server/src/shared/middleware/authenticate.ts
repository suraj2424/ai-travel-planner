import type { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../shared/errors/UnauthorizedError";
import { verifyAccessToken } from "../security/token";
import { errors } from "jose";

async function authenticateAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError(
      "ACCESS_TOKEN_MISSING",
      "Access token is required",
    );
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new UnauthorizedError(
      "INVALID_ACCESS_TOKEN",
      "Invalid authorization header",
    );
  }

  try {
    const payload = await verifyAccessToken(token);

    if (typeof payload.sub !== "string") {
      throw new UnauthorizedError(
        "INVALID_ACCESS_TOKEN",
        "Invalid access token",
      );
    }

    req.user = {
      id: payload.sub,
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }

    if (error instanceof errors.JWTExpired) {
      throw new UnauthorizedError(
        "INVALID_ACCESS_TOKEN",
        "Invalid access token",
      );
    }

    throw new UnauthorizedError("INVALID_ACCESS_TOKEN", "Invalid access token");
  }
}

export default authenticateAccessToken;
