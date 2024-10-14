/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Ceep` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Ceep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ceep" ADD COLUMN     "link" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "citizenBenefitsSummaryBySocialProgramAndCity" (
    "id" UUID NOT NULL,
    "socialProgram" TEXT NOT NULL,
    "monthYear" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "citizenBenefitsSummaryBySocialProgramAndCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citizenBenefitsSummaryByBeneficiary" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "socialProgram" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "citizenBenefitsSummaryByBeneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentCards" (
    "id" UUID NOT NULL,
    "cartType" TEXT NOT NULL,
    "superiorDepartmentBody" TEXT NOT NULL,
    "linkedEntity" TEXT NOT NULL,
    "holderCpf" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "beneficiaryCpfCnpj" TEXT NOT NULL,
    "beneficiaryName" TEXT NOT NULL,
    "amountSpentDuringPeriod" TEXT NOT NULL,

    CONSTRAINT "paymentCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agreementsAndCovenants" (
    "id" UUID NOT NULL,
    "number" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "instrumentType" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "superiorDepartmentBody" TEXT NOT NULL,
    "linkedEntity" TEXT NOT NULL,
    "grantor" TEXT NOT NULL,
    "convenente" TEXT NOT NULL,
    "validityDateStart" TIMESTAMP(3) NOT NULL,
    "validityDateEnd" TIMESTAMP(3) NOT NULL,
    "publishingDate" TIMESTAMP(3) NOT NULL,
    "agreedAmount" INTEGER NOT NULL,
    "celebratedValue" INTEGER NOT NULL,

    CONSTRAINT "agreementsAndCovenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expensesByDepartmentBody" (
    "id" UUID NOT NULL,
    "monthYear" TIMESTAMP(3) NOT NULL,
    "superiorDepartmentBody" TEXT NOT NULL,
    "linkedEntity" TEXT NOT NULL,
    "committedValue" INTEGER NOT NULL,
    "liquidatedValue" INTEGER NOT NULL,
    "paidValue" INTEGER NOT NULL,
    "amountLeftToBePaid" INTEGER NOT NULL,

    CONSTRAINT "expensesByDepartmentBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expensesByAreaOfActivity" (
    "id" UUID NOT NULL,
    "monthYear" TIMESTAMP(3) NOT NULL,
    "areaOfActivity" TEXT NOT NULL,
    "subfunction" TEXT NOT NULL,
    "committedValue" INTEGER NOT NULL,
    "liquidatedValue" INTEGER NOT NULL,
    "paidValue" INTEGER NOT NULL,
    "amountLeftToBePaid" INTEGER NOT NULL,

    CONSTRAINT "expensesByAreaOfActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expensesByProgram" (
    "id" UUID NOT NULL,
    "monthYear" TIMESTAMP(3) NOT NULL,
    "budgetaryProgram" TEXT NOT NULL,
    "budgetaryAction" TEXT NOT NULL,
    "committedValue" INTEGER NOT NULL,
    "liquidatedValue" INTEGER NOT NULL,
    "paidValue" INTEGER NOT NULL,
    "amountLeftToBePaid" INTEGER NOT NULL,

    CONSTRAINT "expensesByProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expensesByAccountingClassification" (
    "id" UUID NOT NULL,
    "monthYear" TIMESTAMP(3) NOT NULL,
    "superiorExecutiveBody" TEXT NOT NULL,
    "linkedExecutingEntity" TEXT NOT NULL,
    "managementUnit" TEXT NOT NULL,
    "budgetarySuperiorDepartmentBody" TEXT NOT NULL,
    "budgetaryEntity" TEXT NOT NULL,
    "budgetaryUnit" TEXT NOT NULL,
    "areaOfActivity" TEXT NOT NULL,
    "subfunction" TEXT NOT NULL,
    "budgetaryProgram" TEXT NOT NULL,
    "budgetaryAction" TEXT NOT NULL,
    "governmentProgram" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "expenseGroup" TEXT NOT NULL,
    "expenseElement" TEXT NOT NULL,
    "applicationType" TEXT NOT NULL,
    "committedValue" INTEGER NOT NULL,
    "liquidatedValue" INTEGER NOT NULL,
    "paidValue" INTEGER NOT NULL,
    "amountLeftToBePaid" INTEGER NOT NULL,

    CONSTRAINT "expensesByAccountingClassification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expensesByBeneficiary" (
    "id" UUID NOT NULL,
    "monthYear" TIMESTAMP(3) NOT NULL,
    "beneficiary" TEXT NOT NULL,
    "beneficiaryType" TEXT NOT NULL,
    "beneficiaryState" TEXT NOT NULL,
    "beneficiaryCity" TEXT NOT NULL,
    "amountReceived" INTEGER NOT NULL,

    CONSTRAINT "expensesByBeneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expensesByDailyDocuments" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "document" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "expensePhase" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "beneficiaryState" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "ug" TEXT NOT NULL,
    "budgetaryUnit" TEXT NOT NULL,
    "departmentBody" TEXT NOT NULL,
    "superiorDepartmentBody" TEXT NOT NULL,
    "expenseGroup" TEXT NOT NULL,
    "expenseElement" TEXT NOT NULL,
    "expenseType" TEXT NOT NULL,
    "budgetaryPlan" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "expensesByDailyDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue" (
    "id" UUID NOT NULL,
    "year" INTEGER NOT NULL,
    "superiorDepartmentBody" TEXT NOT NULL,
    "linkedEntity" TEXT NOT NULL,
    "managementUnit" TEXT NOT NULL,
    "economicCategory" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "updatedBudget_predictedValue" INTEGER NOT NULL,
    "revenue_amountCollected" INTEGER NOT NULL,
    "predictedPercentage" TEXT NOT NULL,
    "amountReleased" INTEGER NOT NULL,

    CONSTRAINT "revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parliamentaryAmendment" (
    "id" UUID NOT NULL,
    "amendmentYear" INTEGER NOT NULL,
    "amendmentType" TEXT NOT NULL,
    "amendmentAuthor" TEXT NOT NULL,
    "amendmentNumber" INTEGER NOT NULL,
    "expenseLocation" TEXT NOT NULL,
    "function" TEXT NOT NULL,
    "subfunction" TEXT NOT NULL,
    "budgetaryProgram" TEXT NOT NULL,
    "budgetaryAction" TEXT NOT NULL,
    "budgetaryPlan" TEXT NOT NULL,
    "amendmentCode" INTEGER NOT NULL,
    "committedValue" INTEGER NOT NULL,
    "liquidatedValue" INTEGER NOT NULL,
    "paidValue" INTEGER NOT NULL,
    "amountLeftToBePaidRegistered" INTEGER NOT NULL,
    "amountLeftToBePaidCancelled" INTEGER NOT NULL,
    "amountLeftToBePaid_Paid" INTEGER NOT NULL,

    CONSTRAINT "parliamentaryAmendment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brazilAid" (
    "id" UUID NOT NULL,

    CONSTRAINT "brazilAid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leniencyAgreements" (
    "id" UUID NOT NULL,
    "year" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "agreedValue" INTEGER NOT NULL,
    "agreementsAnnexesAmendments" TEXT[],

    CONSTRAINT "leniencyAgreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractExecutionsAndCompetitionsPenalties" (
    "id" UUID NOT NULL,
    "year" INTEGER NOT NULL,
    "auction" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "bidder" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "behavior" TEXT NOT NULL,
    "biddingImpedimentInMonths" INTEGER NOT NULL,
    "fine" INTEGER NOT NULL,

    CONSTRAINT "contractExecutionsAndCompetitionsPenalties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tendersAndContracts" (
    "id" UUID NOT NULL,
    "contractualTerm" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "supervisionUnits" TEXT NOT NULL,
    "signatureDate" TIMESTAMP(3) NOT NULL,
    "validityDateStart" TIMESTAMP(3) NOT NULL,
    "validityDateEnd" TIMESTAMP(3) NOT NULL,
    "extendable" BOOLEAN NOT NULL,
    "maximumValidityDate" TIMESTAMP(3) NOT NULL,
    "initialValue" INTEGER NOT NULL,
    "updatedTotalValue" INTEGER NOT NULL,
    "biddingType" TEXT NOT NULL,
    "biddingNumber" INTEGER NOT NULL,
    "biddingYear" INTEGER NOT NULL,
    "originProcess" TEXT NOT NULL,

    CONSTRAINT "tendersAndContracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sanctionedCompanies" (
    "id" UUID NOT NULL,
    "processNumber" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contractNumber" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "sanctionType" TEXT NOT NULL,
    "sanctionDetail" TEXT NOT NULL,
    "fineValue" INTEGER NOT NULL,
    "debitValue" INTEGER NOT NULL,
    "legalFundament" TEXT NOT NULL,
    "sicafRegistrationDate" TIMESTAMP(3) NOT NULL,
    "sanctionStartDate" TIMESTAMP(3) NOT NULL,
    "sanctionEndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sanctionedCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVMSanctioningProceedingsJudged" (
    "id" UUID NOT NULL,
    "processNumber" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "judgmentSessionDate" TIMESTAMP(3) NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "CVMSanctioningProceedingsJudged_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVMLeaveTemporaryPenalties" (
    "id" UUID NOT NULL,
    "processId" TEXT NOT NULL,
    "participant" TEXT NOT NULL,
    "decisionType" TEXT NOT NULL,
    "CVMjudgementDate" TIMESTAMP(3) NOT NULL,
    "effectiveDateOfPenalty" TIMESTAMP(3) NOT NULL,
    "leavePeriod" TEXT NOT NULL,
    "decision" TEXT NOT NULL,

    CONSTRAINT "CVMLeaveTemporaryPenalties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVMTemporarilyProhibitedOrPrevented" (
    "id" UUID NOT NULL,
    "processId" TEXT NOT NULL,
    "participant" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "decisionType" TEXT NOT NULL,
    "CVMjudgementDate" TIMESTAMP(3) NOT NULL,
    "effectiveDateOfPenalty" TIMESTAMP(3) NOT NULL,
    "leavePeriod" TEXT NOT NULL,
    "trialSessionReport" TEXT NOT NULL,
    "prohibitionModality" TEXT NOT NULL,

    CONSTRAINT "CVMTemporarilyProhibitedOrPrevented_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVMGeneralFrameworkOfDisallowedPersons" (
    "id" UUID NOT NULL,
    "pas" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "penalty" TEXT NOT NULL,
    "termInYears" INTEGER NOT NULL,
    "startOfPenaltyTerm" TIMESTAMP(3) NOT NULL,
    "endOfPenaltyTerm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CVMGeneralFrameworkOfDisallowedPersons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVMGeneralFrameworkofPersonsProhibitedFromActing" (
    "id" UUID NOT NULL,
    "pas" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "penalty" TEXT NOT NULL,
    "termInYears" INTEGER NOT NULL,
    "startOfPenaltyTerm" TIMESTAMP(3) NOT NULL,
    "endOfPenaltyTerm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CVMGeneralFrameworkofPersonsProhibitedFromActing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVMDeliberations" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "CVMDeliberations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generalActiveDebt_SIDA_System" (
    "id" UUID NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "personType" TEXT NOT NULL,
    "debtorType" TEXT NOT NULL,
    "debtorName" TEXT NOT NULL,
    "debtorState" TEXT NOT NULL,
    "responsibleUnit" TEXT NOT NULL,
    "registrationNumber" INTEGER NOT NULL,
    "registrationSituationType" TEXT NOT NULL,
    "registrationSituation" TEXT NOT NULL,
    "mainRevenue" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "indicatorJudged" BOOLEAN NOT NULL,
    "consolidatedValue" INTEGER NOT NULL,

    CONSTRAINT "generalActiveDebt_SIDA_System_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FGTSDebt" (
    "id" UUID NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "personType" TEXT NOT NULL,
    "debtorType" TEXT NOT NULL,
    "debtorName" TEXT NOT NULL,
    "debtorState" TEXT NOT NULL,
    "responsibleUnit" TEXT NOT NULL,
    "responsibleEntity" TEXT NOT NULL,
    "registrationUnit" TEXT NOT NULL,
    "registrationNumber" INTEGER NOT NULL,
    "registrationSituationType" TEXT NOT NULL,
    "registrationSituation" TEXT NOT NULL,
    "mainRevenue" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "indicatorJudged" BOOLEAN NOT NULL,
    "consolidatedValue" INTEGER NOT NULL,

    CONSTRAINT "FGTSDebt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialSecurityDebt_Debt_System" (
    "id" UUID NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "personType" TEXT NOT NULL,
    "debtorType" TEXT NOT NULL,
    "debtorName" TEXT NOT NULL,
    "debtorState" TEXT NOT NULL,
    "responsibleUnit" TEXT NOT NULL,
    "registrationNumber" INTEGER NOT NULL,
    "registrationSituationType" TEXT NOT NULL,
    "registrationSituation" TEXT NOT NULL,
    "creditType" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "indicatorJudged" BOOLEAN NOT NULL,
    "consolidatedValue" INTEGER NOT NULL,

    CONSTRAINT "socialSecurityDebt_Debt_System_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ceep_link_key" ON "Ceep"("link");
