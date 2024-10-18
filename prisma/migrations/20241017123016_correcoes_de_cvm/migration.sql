/*
  Warnings:

  - You are about to drop the `CVMSanctioningProceedingsJudged` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CVMSanctioningProceedingsJudged";

-- CreateTable
CREATE TABLE "CVMJudgedSanctioningProceedings" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "judgmentSessionDate" TIMESTAMP(3) NOT NULL,
    "pdfUrl" TEXT NOT NULL,

    CONSTRAINT "CVMJudgedSanctioningProceedings_pkey" PRIMARY KEY ("id")
);
