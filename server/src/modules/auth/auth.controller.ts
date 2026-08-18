import AuthService from "./auth.service";
import type { Request, Response } from "express";

class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  loginUser = async (req: Request, res: Response) => {
    const data = await this.authService.loginUser(req.body);

    return res.status(200).json({
      data,
    });
  }

  createNewAccessToken = async (req: Request, res: Response) => {
    const data = await this.authService.createNewAccessToken(req.body);

    return res.status(200).json({
      data
    });
  }
}

export default AuthController;