-- CreateEnum
CREATE TYPE "TravelStyle" AS ENUM ('ADVENTURE', 'RELAXED', 'CULTURAL', 'LUXURY', 'BUDGET');

-- CreateEnum
CREATE TYPE "Interest" AS ENUM ('FOOD', 'HISTORY', 'NATURE', 'BEACHES', 'MOUNTAINS', 'NIGHTLIFE', 'SHOPPING', 'CULTURE', 'WILDLIFE', 'PHOTOGRAPHY', 'TREKKING', 'WELLNESS', 'SPIRITUAL', 'ADVENTURE_SPORTS');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('DRAFT', 'PLANNED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Trip" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "destination" VARCHAR(150) NOT NULL,
    "travellers" INTEGER NOT NULL,
    "startDate" TIMESTAMPTZ NOT NULL,
    "endDate" TIMESTAMPTZ NOT NULL,
    "budget" INTEGER,
    "travelStyle" "TravelStyle",
    "interests" "Interest"[],
    "status" "TripStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Trip_userId_idx" ON "Trip"("userId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
