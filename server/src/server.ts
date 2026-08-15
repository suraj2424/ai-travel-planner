import app from "./app/app.ts"
import { config } from "./config/env.ts"
import  prisma, { connectDatabase } from "./infrastructure/database/prisma.ts";

async function startServer() {
  await connectDatabase();

  const server = app.listen(config.port, () => {
    console.log(
      `Server running on port ${config.port} in ${config.environment} mode`
    );
  });

  const shutdown = async (signal: string) => {
    console.log(`${signal} received, Shutting down`);

    server.close(async () => {
      await prisma.$disconnect();
      console.log("Server shut down gracefully");
      process.exit(0);
    })
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((error) => {
  console.error("Failed to start server: ", error);
  process.exit(1);
})
