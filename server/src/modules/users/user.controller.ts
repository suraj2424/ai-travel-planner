import type { Request, Response } from "express";
import UserService from "./user.service";

class UserController {
  constructor(
    private userService: UserService
  ) { }

  createUser = async (req: Request, res: Response) => {
    const requestBody = req.body;
    const data = await this.userService.createUser(requestBody);
    return res.status(201).json({
      data
    });
  }
}

export default UserController;