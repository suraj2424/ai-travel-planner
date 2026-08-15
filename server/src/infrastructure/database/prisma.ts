import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";
import { config } from "../../config/env";


const adapter = new PrismaPg({
  connectionString: config.database_url
});

const prisma = new PrismaClient({
  adapter
});

export async function connectDatabase() {
  await prisma.$connect();
  console.log("Database connected");
}

export default prisma;