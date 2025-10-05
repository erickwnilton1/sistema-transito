/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `boletim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "boletim" DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "protocol" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "metadata" JSONB;
