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
    modality,
    yearNumber,
    object,
    originalProcessNumber,
    contractualTerm,
    biddingStatus,
    estimatedValue,
  }: Prisma.contractExecutionsAndCompetitionsPenaltiesCreateInput): Promise<contractExecutionsAndCompetitionsPenalties> {
    const newContractExecutionsAndCompetitionsPenalties =
      await prisma.contractExecutionsAndCompetitionsPenalties.create({
        data: {
          modality,
          yearNumber,
          object,
          originalProcessNumber,
          contractualTerm,
          biddingStatus,
          estimatedValue,
        },
      });

    return newContractExecutionsAndCompetitionsPenalties;
  }
}

export { PrismaContractExecutionsAndCompetitionsPenaltiesRepository };
