-- CreateEnum
CREATE TYPE "CitizenBulletinStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "citizen_bulletin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "outroVeiculo" TEXT,
    "outroCondutor" TEXT,
    "testemunhas" TEXT NOT NULL,
    "relato" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "status" "CitizenBulletinStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "citizen_bulletin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "citizen_bulletin" ADD CONSTRAINT "citizen_bulletin_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
