-- CreateEnum
CREATE TYPE "PortalDaTransparenciaResource" AS ENUM ('AUXILIO_BRASIL', 'NOVO_BOLSA_FAMILIA', 'BOLSA_FAMILIA', 'SEGURO_DEFESO', 'SAFRA', 'PETIT', 'BPC', 'AUXILIO_EMERGENCIAL', 'CARTOES');

-- CreateTable
CREATE TABLE "PortalDaTransparenciaItem" (
    "id" UUID NOT NULL,
    "resource" "PortalDaTransparenciaResource" NOT NULL,
    "apiResponse" JSONB,

    CONSTRAINT "PortalDaTransparenciaItem_pkey" PRIMARY KEY ("id")
);
