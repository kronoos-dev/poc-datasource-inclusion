import { prisma } from "@lib/prisma";
import {
  contractExecutionsAndCompetitionsPenalties,
  Prisma,
} from "@prisma/client";
import { IContractExecutionsAndCompetitionsPenaltiesRepository } from "../IContractExecutionsAndCompetitionsPenaltiesRepository";

class PrismaContractExecutionsAndCompetitionsPenaltiesRepository
  implements IContractExecutionsAndCompetitionsPenaltiesRepository
{
  private static INSTANCE: PrismaContractExecutionsAndCompetitionsPenaltiesRepository;

  async find(): Promise<contractExecutionsAndCompetitionsPenalties[]> {
    const contractExecutionsAndCompetitionsPenaltiesList =
      await prisma.contractExecutionsAndCompetitionsPenalties.findMany();

    return contractExecutionsAndCompetitionsPenaltiesList;
  }

  public static getInstance(): PrismaContractExecutionsAndCompetitionsPenaltiesRepository {
    if (!PrismaContractExecutionsAndCompetitionsPenaltiesRepository.INSTANCE) {
      PrismaContractExecutionsAndCompetitionsPenaltiesRepository.INSTANCE =
        new PrismaContractExecutionsAndCompetitionsPenaltiesRepository();
    }

    return PrismaContractExecutionsAndCompetitionsPenaltiesRepository.INSTANCE;
  }

  async create({
    cpfCnpj,
    personType,
    debtorType,
    debtorName,
    responsibleUnitState,
    responsibleUnit,
    responsibleEntity,
    registrationUnit,
    registrationNumber,
    registrationSituationType,
    registrationSituation,
    mainRevenue,
    registrationDate,
    legalIndicator,
    consolidatedValue,
  }: Prisma.contractExecutionsAndCompetitionsPenaltiesCreateInput): Promise<contractExecutionsAndCompetitionsPenalties> {
    const newContractExecutionsAndCompetitionsPenalties =
      await prisma.contractExecutionsAndCompetitionsPenalties.create({
        data: {
          cpfCnpj,
          personType,
          debtorType,
          debtorName,
          responsibleUnitState,
          responsibleUnit,
          responsibleEntity,
          registrationUnit,
          registrationNumber,
          registrationSituationType,
          registrationSituation,
          mainRevenue,
          registrationDate,
          legalIndicator,
          consolidatedValue,
        },
      });

    return newContractExecutionsAndCompetitionsPenalties;
  }
}

export { PrismaContractExecutionsAndCompetitionsPenaltiesRepository };
