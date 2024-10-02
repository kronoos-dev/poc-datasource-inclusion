-- CreateTable
CREATE TABLE "benefitBolsaFamilia" (
    "id" SERIAL NOT NULL,
    "transferredValue" INTEGER NOT NULL,
    "socialProgram" INTEGER NOT NULL,

    CONSTRAINT "benefitBolsaFamilia_pkey" PRIMARY KEY ("id")
);
