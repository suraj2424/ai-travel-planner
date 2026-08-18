import express from "express"
import { authController } from "./auth.dependencies";
import validate from "../../shared/middleware/validate";
import authSchema, { refreshTokenSchema } from "../../shared/validation/auth.schema";

const router = express.Router();

router.post("/auth/login", validate(authSchema), authController.loginUser);

router.post("/auth/refresh", validate(refreshTokenSchema), authController.createNewAccessToken)

export default router;
