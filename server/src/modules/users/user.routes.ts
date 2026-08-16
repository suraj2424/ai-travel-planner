import { Router } from "express";
import { userController } from "./user.dependencies";
import validate from "../../shared/middleware/validate";
import userSchema, { getUsersSchema } from "../../shared/validation/user.schema";

const router = Router();

router.post("/users", validate(userSchema), userController.createUser);

router.get("/users/:id", userController.findById);

router.get("/users", validate(getUsersSchema, "query"), userController.getAllUsers)

export default router;