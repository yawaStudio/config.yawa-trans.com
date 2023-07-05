/*
  Warnings:

  - You are about to drop the column `deviceId` on the `Sim` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[simId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `simId` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sim" DROP CONSTRAINT "Sim_deviceId_fkey";

-- DropIndex
DROP INDEX "Sim_deviceId_key";

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "simId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Sim" DROP COLUMN "deviceId";

-- CreateIndex
CREATE UNIQUE INDEX "Device_simId_key" ON "Device"("simId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_simId_fkey" FOREIGN KEY ("simId") REFERENCES "Sim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
