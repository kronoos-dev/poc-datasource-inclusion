import { prisma } from "@lib/prisma";
import { appliedPenalties, Prisma } from "@prisma/client";
import { IAppliedPenaltiesRepository } from "../IAppliedPenaltiesRepository";

class PrismaAppliedPenaltiesRepository implements IAppliedPenaltiesRepository {
  private static INSTANCE: PrismaAppliedPenaltiesRepository;

  async find(): Promise<appliedPenalties[]> {
    const contractExecutionsAndCompetitionsPenaltiesList =
      await prisma.appliedPenalties.findMany();

    return contractExecutionsAndCompetitionsPenaltiesList;
  }

  public static getInstance(): PrismaAppliedPenaltiesRepository {
    if (!PrismaAppliedPenaltiesRepository.INSTANCE) {
      PrismaAppliedPenaltiesRepository.INSTANCE =
        new PrismaAppliedPenaltiesRepository();
    }

    return PrismaAppliedPenaltiesRepository.INSTANCE;
  }

  async create({
    year,
    pregao,
    process,
    cnpj,
    bidder,
    object,
    conduct,
    impeditionFromBidding,
    fineValue,
  }: Prisma.appliedPenaltiesCreateInput): Promise<appliedPenalties> {
    const newContractExecutionsAndCompetitionsPenalties =
      await prisma.appliedPenalties.create({
        data: {
          year,
          pregao,
          process,
          cnpj,
          bidder,
          object,
          conduct,
          impeditionFromBidding,
          fineValue,
        },
      });

    return newContractExecutionsAndCompetitionsPenalties;
  }
}

export { PrismaAppliedPenaltiesRepository };
