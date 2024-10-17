import { prisma } from "@lib/prisma";
import { Prisma, CVMJudgedSanctioningProceedings } from "@prisma/client";
import { IJudgedSanctioningProceedingsRepository } from "../IJudgedSanctioningProceedingsRepository";

class PrismaJudgedSanctioningProceedingsRepository
  implements IJudgedSanctioningProceedingsRepository
{
  private static INSTANCE: PrismaJudgedSanctioningProceedingsRepository;

  async find(): Promise<CVMJudgedSanctioningProceedings[]> {
    const sanctioningProceedingsJudgedList =
      await prisma.cVMJudgedSanctioningProceedings.findMany();

    return sanctioningProceedingsJudgedList;
  }

  public static getInstance(): PrismaJudgedSanctioningProceedingsRepository {
    if (!PrismaJudgedSanctioningProceedingsRepository.INSTANCE) {
      PrismaJudgedSanctioningProceedingsRepository.INSTANCE =
        new PrismaJudgedSanctioningProceedingsRepository();
    }

    return PrismaJudgedSanctioningProceedingsRepository.INSTANCE;
  }

  async create({
    title,
    description,
    judgmentSessionDate,
    pdfUrl,
  }: Prisma.CVMJudgedSanctioningProceedingsUncheckedCreateInput): Promise<CVMJudgedSanctioningProceedings> {
    const newJudgedSanctioningProceedings =
      await prisma.cVMJudgedSanctioningProceedings.create({
        data: {
          title,
          description,
          judgmentSessionDate,
          pdfUrl,
        },
      });

    return newJudgedSanctioningProceedings;
  }
}

export { PrismaJudgedSanctioningProceedingsRepository };
