import { prisma } from "@lib/prisma";
import { Prisma, FGTSDebt } from "@prisma/client";
import { IFgtsDebtRepository } from "../IFgtsDebtRepository";

class PrismaFgtsDebtRepository implements IFgtsDebtRepository {
  private static INSTANCE: PrismaFgtsDebtRepository;

  async find(): Promise<FGTSDebt[]> {
    const fgtsDebtList = await prisma.fGTSDebt.findMany();

    return fgtsDebtList;
  }

  public static getInstance(): PrismaFgtsDebtRepository {
    if (!PrismaFgtsDebtRepository.INSTANCE) {
      PrismaFgtsDebtRepository.INSTANCE = new PrismaFgtsDebtRepository();
    }

    return PrismaFgtsDebtRepository.INSTANCE;
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
    indicatorJudged,
    consolidatedValue,
  }: Prisma.FGTSDebtCreateInput): Promise<FGTSDebt> {
    const newFgtsDebt = await prisma.fGTSDebt.create({
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
        indicatorJudged,
        consolidatedValue,
      },
    });

    return newFgtsDebt;
  }
}

export { PrismaFgtsDebtRepository };
