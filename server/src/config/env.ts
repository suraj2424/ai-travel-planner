import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535),
  NODE_ENV: z.enum(["development", "production", "test"]),
  DATABASE_URL: z.string()
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
  database_url: parsedEnv.data.DATABASE_URL
}
