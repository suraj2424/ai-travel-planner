import { Router } from "express";
import { userController } from "./user.dependencies";
import validate from "../../shared/middleware/validate";
import userSchema from "../../shared/validation/user.schema";

const router = Router();

router.post("/users", validate(userSchema), userController.createUser);

export default router;