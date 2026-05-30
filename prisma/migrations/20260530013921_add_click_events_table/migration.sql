/*
  Warnings:

  - You are about to drop the column `createdAt` on the `clickEvent` table. All the data in the column will be lost.
  - Added the required column `urlId` to the `clickEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clickEvent" DROP COLUMN "createdAt",
ADD COLUMN     "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "urlId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "clickEvent" ADD CONSTRAINT "clickEvent_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
