/*
  Warnings:

  - You are about to drop the column `date` on the `CVMDeliberations` table. All the data in the column will be lost.
  - You are about to drop the column `file` on the `CVMDeliberations` table. All the data in the column will be lost.
  - Added the required column `dateJudgementSession` to the `CVMDeliberations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `CVMDeliberations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docUrl` to the `CVMDeliberations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdfUrl` to the `CVMDeliberations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CVMDeliberations" DROP COLUMN "date",
DROP COLUMN "file",
ADD COLUMN     "dateJudgementSession" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "docUrl" TEXT NOT NULL,
ADD COLUMN     "pdfUrl" TEXT NOT NULL;
