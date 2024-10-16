import { prisma } from "@lib/prisma";
import { Prisma, CVMGeneralFrameworkOfDisallowedPersons } from "@prisma/client";

import { IGeneralFrameworkOfDisallowedPersonsRepository } from "../IGeneralFrameworkOfDisallowedPersonsRepository";

class PrismaGeneralFrameworkOfDisallowedPersonsRepository
  implements IGeneralFrameworkOfDisallowedPersonsRepository
{
  private static INSTANCE: PrismaGeneralFrameworkOfDisallowedPersonsRepository;

  async find(): Promise<CVMGeneralFrameworkOfDisallowedPersons[]> {
    const generalFrameworkOfDisallowedPersonsList =
      await prisma.cVMGeneralFrameworkOfDisallowedPersons.findMany();

    return generalFrameworkOfDisallowedPersonsList;
  }

  public static getInstance(): PrismaGeneralFrameworkOfDisallowedPersonsRepository {
    if (!PrismaGeneralFrameworkOfDisallowedPersonsRepository.INSTANCE) {
      PrismaGeneralFrameworkOfDisallowedPersonsRepository.INSTANCE =
        new PrismaGeneralFrameworkOfDisallowedPersonsRepository();
    }

    return PrismaGeneralFrameworkOfDisallowedPersonsRepository.INSTANCE;
  }

  async create({
    pas,
    name,
    cpf,
    penalty,
    termInYears,
    startOfPenaltyTerm,
    endOfPenaltyTerm,
  }: Prisma.CVMGeneralFrameworkOfDisallowedPersonsCreateInput): Promise<CVMGeneralFrameworkOfDisallowedPersons> {
    const newGeneralFrameworkOfDisallowedPersons =
      await prisma.cVMGeneralFrameworkOfDisallowedPersons.create({
        data: {
          pas,
          name,
          cpf,
          penalty,
          termInYears,
          startOfPenaltyTerm,
          endOfPenaltyTerm,
        },
      });

    return newGeneralFrameworkOfDisallowedPersons;
  }
}

export { PrismaGeneralFrameworkOfDisallowedPersonsRepository };
