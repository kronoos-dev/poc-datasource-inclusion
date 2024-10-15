import { prisma } from "@lib/prisma";
import {
  Prisma,
  CVMGeneralFrameworkofPersonsProhibitedFromActing,
} from "@prisma/client";

import { IGeneralFrameworkOfPersonsProhibitedFromActingRepository } from "../IGeneralFrameworkOfPersonsProhibitedFromActingRepository";

class PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository
  implements IGeneralFrameworkOfPersonsProhibitedFromActingRepository
{
  private static INSTANCE: PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository;

  async find(): Promise<CVMGeneralFrameworkofPersonsProhibitedFromActing[]> {
    const generalFrameworkofPersonsProhibitedFromActingList =
      await prisma.cVMGeneralFrameworkofPersonsProhibitedFromActing.findMany();

    return generalFrameworkofPersonsProhibitedFromActingList;
  }

  public static getInstance(): PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository {
    if (
      !PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository.INSTANCE
    ) {
      PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository.INSTANCE =
        new PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository();
    }

    return PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository.INSTANCE;
  }

  async create({
    pas,
    name,
    cpfCnpj,
    penalty,
    termInYears,
    startOfPenaltyTerm,
    endOfPenaltyTerm,
  }: Prisma.CVMGeneralFrameworkofPersonsProhibitedFromActingCreateInput): Promise<CVMGeneralFrameworkofPersonsProhibitedFromActing> {
    const newGeneralFrameworkofPersonsProhibitedFromActing =
      await prisma.cVMGeneralFrameworkofPersonsProhibitedFromActing.create({
        data: {
          pas,
          name,
          cpfCnpj,
          penalty,
          termInYears,
          startOfPenaltyTerm,
          endOfPenaltyTerm,
        },
      });

    return newGeneralFrameworkofPersonsProhibitedFromActing;
  }
}

export { PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository };
