import { z } from "zod"

const authSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export const googleAuthSchema = z.object({
  idToken: z.string().min(1, "Google ID token is required"),
});

export default authSchema;
