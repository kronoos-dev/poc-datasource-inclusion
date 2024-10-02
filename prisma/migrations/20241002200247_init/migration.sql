-- CreateTable
CREATE TABLE "CEEP_datasource" (
    "id" SERIAL NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "corporateName" TEXT NOT NULL,
    "sanctionDescription" TEXT NOT NULL,
    "sanctionDate" TIMESTAMP(3) NOT NULL,
    "leeniencyAgreement" BOOLEAN NOT NULL,
    "disagreementDeal" BOOLEAN NOT NULL,

    CONSTRAINT "CEEP_datasource_pkey" PRIMARY KEY ("id")
);
