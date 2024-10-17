import { prisma } from "@lib/prisma";
import { Prisma, CVMLeaveTemporaryPenalties } from "@prisma/client";
import { ILeaveTemporaryPenaltiesRepository } from "../ILeaveTemporaryPenaltiesRepository";

class PrismaLeaveTemporaryPenaltiesRepository
  implements ILeaveTemporaryPenaltiesRepository
{
  private static INSTANCE: PrismaLeaveTemporaryPenaltiesRepository;

  async find(): Promise<CVMLeaveTemporaryPenalties[]> {
    const leaveTemporaryPenaltiesList =
      await prisma.cVMLeaveTemporaryPenalties.findMany();

    return leaveTemporaryPenaltiesList;
  }

  public static getInstance(): PrismaLeaveTemporaryPenaltiesRepository {
    if (!PrismaLeaveTemporaryPenaltiesRepository.INSTANCE) {
      PrismaLeaveTemporaryPenaltiesRepository.INSTANCE =
        new PrismaLeaveTemporaryPenaltiesRepository();
    }

    return PrismaLeaveTemporaryPenaltiesRepository.INSTANCE;
  }

  async create({
    processId,
    participant,
    decisionType,
    CVMjudgementDate,
    effectiveDateOfPenalty,
    leavePeriod,
    decision,
  }: Prisma.CVMLeaveTemporaryPenaltiesCreateInput): Promise<CVMLeaveTemporaryPenalties> {
    const newLeaveTemporaryPenaltiesList =
      await prisma.cVMLeaveTemporaryPenalties.create({
        data: {
          processId,
          participant,
          decisionType,
          CVMjudgementDate,
          effectiveDateOfPenalty,
          leavePeriod,
          decision,
        },
      });

    return newLeaveTemporaryPenaltiesList;
  }
}

export { PrismaLeaveTemporaryPenaltiesRepository };
