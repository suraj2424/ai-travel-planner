import type { Request, Response } from "express";
import UserService from "./user.service";
import BadRequestError from "../../shared/errors/BadRequestError";
import UnauthorizedError from "../../shared/errors/UnauthorizedError";

class UserController {
  constructor(
    private userService: UserService
  ) { }

  createUser = async (req: Request, res: Response) => {
    const requestBody = req.body;
    await this.userService.createUser(requestBody);
    return res.status(201).json({
      message: "User created successfully"
    });
  }

  updateUser = async (req: Request, res: Response) => {
    const rBody = req.body;
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError("ACCESS_DENIED", "No session found!");
    }
    await this.userService.updateUser(userId, rBody);
    return res.status(200).json({
      message: "User information updated successfully"
    });
  }

  findById = async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    
    if (!id)
      throw new BadRequestError("VALIDATION_ERROR", "Missing Parameters");

    const user = await this.userService.findById(id);
    return res.status(200).json({ data: user });
  }

  getAllUsers = async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const result = await this.userService.getAllUsers(
      Number(page), Number(limit)
    );
    return res.status(200).json({
      data: result.users,
      meta: {
        page,
        limit,
        total: result.total
      }
    });
  }
}

export default UserController;