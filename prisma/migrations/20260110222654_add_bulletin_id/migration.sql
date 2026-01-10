/*
  Warnings:

  - A unique constraint covering the columns `[protocol]` on the table `citizen_bulletin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "citizen_bulletin" ADD COLUMN     "protocol" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "citizen_bulletin_protocol_key" ON "citizen_bulletin"("protocol");
