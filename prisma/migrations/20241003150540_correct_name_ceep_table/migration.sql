/*
  Warnings:

  - You are about to drop the `CEEP_datasource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CEEP_datasource";

-- CreateTable
CREATE TABLE "ceep_datasource" (
    "id" UUID NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "corporateName" TEXT NOT NULL,
    "sanctionDescription" TEXT NOT NULL,
    "sanctionDate" TIMESTAMP(3) NOT NULL,
    "leeniencyAgreement" BOOLEAN NOT NULL,
    "disagreementDeal" BOOLEAN NOT NULL,

    CONSTRAINT "ceep_datasource_pkey" PRIMARY KEY ("id")
);
