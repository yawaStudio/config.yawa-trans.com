-- DropForeignKey
ALTER TABLE "Companie" DROP CONSTRAINT "Companie_ReseauId_fkey";

-- DropForeignKey
ALTER TABLE "ReseauConfig" DROP CONSTRAINT "ReseauConfig_reseauId_fkey";

-- AlterTable
ALTER TABLE "ReseauConfig" ALTER COLUMN "itinerary" SET DEFAULT 'Global',
ALTER COLUMN "invoicing" SET DEFAULT 'Global';

-- AddForeignKey
ALTER TABLE "ReseauConfig" ADD CONSTRAINT "ReseauConfig_reseauId_fkey" FOREIGN KEY ("reseauId") REFERENCES "Reseau"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companie" ADD CONSTRAINT "Companie_ReseauId_fkey" FOREIGN KEY ("ReseauId") REFERENCES "Reseau"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
