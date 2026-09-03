import { config } from "../../config/env";
import UnauthorizedError from "../../shared/errors/UnauthorizedError";
import AuthService from "./auth.service";
import type { Request, Response } from "express";

class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  loginUser = async (req: Request, res: Response) => {
    const data = await this.authService.loginUser(req.body);
  
    const { accessToken, refreshToken, user } = data;
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.environment === "production",
      sameSite: "lax",
      maxAge: config.refresh_token_expires_in * 24 * 60 * 60 * 1000,
      path: "/",
    });
  
    return res.status(200).json({
      data: {
        accessToken,
        user,
      },
    });
  };

  createNewAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError(
        "REFRESH_TOKEN_MISSING",
        "Refresh token is missing",
      );
    }
    
    const data = await this.authService.createNewAccessToken(refreshToken);

    return res.status(200).json({
      data
    });
  }

  loginWithGoogle = async (req: Request, res: Response) => {
    const { idToken } = req.body;
    const data = await this.authService.loginWithGoogle(idToken);

    const { accessToken, refreshToken, user } = data;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.environment === "production",
      sameSite: "lax",
      maxAge: config.refresh_token_expires_in * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      data: {
        accessToken,
        user,
      },
    });
  };
}

export default AuthController;