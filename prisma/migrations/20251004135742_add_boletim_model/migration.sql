-- CreateTable
CREATE TABLE "boletim" (
    "id" SERIAL NOT NULL,
    "protocol" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "observation" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agentId" TEXT NOT NULL,

    CONSTRAINT "boletim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boletim_protocol_key" ON "boletim"("protocol");

-- AddForeignKey
ALTER TABLE "boletim" ADD CONSTRAINT "boletim_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
