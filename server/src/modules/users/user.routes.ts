import { Router } from "express";
import { userController } from "./user.dependencies";
import validate from "../../shared/middleware/validate";
import userSchema, { getUsersSchema, updateUserSchema } from "../../shared/validation/user.schema";
import authenticateAccessToken from "../../shared/middleware/authenticate";

const router = Router();

router.post("/users", validate(userSchema), userController.createUser);

router.post("/users/update", validate(updateUserSchema), userController.updateUser);

router.get("/users/:id", userController.findById);

router.get("/users", validate(getUsersSchema, "query"), authenticateAccessToken, userController.getAllUsers)

export default router;