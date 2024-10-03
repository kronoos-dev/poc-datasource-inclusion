/*
  Warnings:

  - The primary key for the `CEEP_datasource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `benefitBolsaFamilia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `CEEP_datasource` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `benefitBolsaFamilia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CEEP_datasource" DROP CONSTRAINT "CEEP_datasource_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "CEEP_datasource_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "benefitBolsaFamilia" DROP CONSTRAINT "benefitBolsaFamilia_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "benefitBolsaFamilia_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "federalGovernmentPaymentCard" (
    "id" UUID NOT NULL,
    "superiorDepartmentBodyCode" INTEGER NOT NULL,
    "superiorDepartmentBodyName" TEXT NOT NULL,
    "departmentBodyCode" INTEGER NOT NULL,
    "deparmentBodyName" TEXT NOT NULL,
    "managementUnitCode" INTEGER NOT NULL,
    "managementUnitName" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "holderCpf" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "beneficiaryCpfCnpj" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "transactionValue" INTEGER NOT NULL,

    CONSTRAINT "federalGovernmentPaymentCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "federalGovernmentPaymentCard_centralizedPurchasing" (
    "id" UUID NOT NULL,
    "superiorDepartmentBodyCode" INTEGER NOT NULL,
    "superiorDepartmentBodyName" TEXT NOT NULL,
    "departmentBodyCode" INTEGER NOT NULL,
    "deparmentBodyName" TEXT NOT NULL,
    "managementUnitCode" INTEGER NOT NULL,
    "managementUnitName" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "acquisitionType" TEXT NOT NULL,
    "beneficiaryCpfCnpj" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "transactionValue" INTEGER NOT NULL,

    CONSTRAINT "federalGovernmentPaymentCard_centralizedPurchasing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "civilDefensePaymentCard" (
    "id" UUID NOT NULL,
    "superiorDepartmentBodyCode" INTEGER NOT NULL,
    "superiorDepartmentBodyName" TEXT NOT NULL,
    "departmentBodyCode" INTEGER NOT NULL,
    "deparmentBodyName" TEXT NOT NULL,
    "managementUnitCode" INTEGER NOT NULL,
    "managementUnitName" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "holderCpf" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "beneficiaryCpfCnpj" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "expenseExecutor" TEXT NOT NULL,
    "agreementNumber" INTEGER NOT NULL,
    "agreementCode" INTEGER NOT NULL,
    "agreementName" TEXT NOT NULL,
    "transfer" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "transactionValue" INTEGER NOT NULL,

    CONSTRAINT "civilDefensePaymentCard_pkey" PRIMARY KEY ("id")
);
