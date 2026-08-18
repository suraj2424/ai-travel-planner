import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535),
  NODE_ENV: z.enum(["development", "production", "test"]),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.coerce.number().int(),
});


const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration");
  console.error(parsedEnv.error.issues);
  process.exit(1);
}

export const config = {
  port: parsedEnv.data.PORT,
  environment: parsedEnv.data.NODE_ENV,
  database_url: parsedEnv.data.DATABASE_URL,
  jwt_secret: parsedEnv.data.JWT_SECRET,
  jwt_access_token_expires_in: parsedEnv.data.JWT_ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expires_in: parsedEnv.data.REFRESH_TOKEN_EXPIRES_IN
}
