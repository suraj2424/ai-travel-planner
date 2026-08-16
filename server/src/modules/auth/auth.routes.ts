import express from "express"
import { authController } from "./auth.dependencies";
import validate from "../../shared/middleware/validate";
import authSchema from "../../shared/validation/auth.schema";

const router = express.Router();

router.post("/auth/login", validate(authSchema), authController.loginUser);

export default router;
