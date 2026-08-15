import prisma from "./prisma";

async function main() {
  await prisma.$connect();
  console.log("Database connected successfully");
}

main()
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });