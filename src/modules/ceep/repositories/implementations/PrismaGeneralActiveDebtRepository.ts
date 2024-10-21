import { prisma } from "@lib/prisma";
import { generalActiveDebt_SIDA_System, Prisma } from "@prisma/client";
import { IGeneralActiveDebtRepository } from "../IGeneralActiveDebtRepository";

class PrismaGeneralActiveDebtRepository
  implements IGeneralActiveDebtRepository
{
  private static INSTANCE: PrismaGeneralActiveDebtRepository;

  async find(): Promise<generalActiveDebt_SIDA_System[]> {
    const generalActiveDebtList =
      await prisma.generalActiveDebt_SIDA_System.findMany();

    return generalActiveDebtList;
  }

  public static getInstance(): PrismaGeneralActiveDebtRepository {
    if (!PrismaGeneralActiveDebtRepository.INSTANCE) {
      PrismaGeneralActiveDebtRepository.INSTANCE =
        new PrismaGeneralActiveDebtRepository();
    }

    return PrismaGeneralActiveDebtRepository.INSTANCE;
  }

  async create({
    cpfCnpj,
    personType,
    debtorType,
    debtorName,
    debtorState,
    responsibleUnit,
    registrationNumber,
    registrationSituationType,
    registrationSituation,
    mainRevenue,
    registrationDate,
    indicatorJudged,
    consolidatedValue,
  }: Prisma.generalActiveDebt_SIDA_SystemCreateInput): Promise<generalActiveDebt_SIDA_System> {
    const newGeneralActiveDebt =
      await prisma.generalActiveDebt_SIDA_System.create({
        data: {
          cpfCnpj,
          personType,
          debtorType,
          debtorName,
          debtorState,
          responsibleUnit,
          registrationNumber,
          registrationSituationType,
          registrationSituation,
          mainRevenue,
          registrationDate,
          indicatorJudged,
          consolidatedValue,
        },
      });

    return newGeneralActiveDebt;
  }
}

export { PrismaGeneralActiveDebtRepository };
