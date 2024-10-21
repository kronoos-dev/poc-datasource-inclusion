import { prisma } from "@lib/prisma";
import { Prisma, socialSecurityDebt_Debt_System } from "@prisma/client";
import { ISocialSecurityRepository } from "../ISocialSecurityRepository";

class PrismaSocialSecurityRepository implements ISocialSecurityRepository {
  private static INSTANCE: PrismaSocialSecurityRepository;

  async find(): Promise<socialSecurityDebt_Debt_System[]> {
    const socialSecurityList =
      await prisma.socialSecurityDebt_Debt_System.findMany();

    return socialSecurityList;
  }

  public static getInstance(): PrismaSocialSecurityRepository {
    if (!PrismaSocialSecurityRepository.INSTANCE) {
      PrismaSocialSecurityRepository.INSTANCE =
        new PrismaSocialSecurityRepository();
    }

    return PrismaSocialSecurityRepository.INSTANCE;
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
    creditType,
    registrationDate,
    indicatorJudged,
    consolidatedValue,
  }: Prisma.socialSecurityDebt_Debt_SystemCreateInput): Promise<socialSecurityDebt_Debt_System> {
    const newSocialSecurity =
      await prisma.socialSecurityDebt_Debt_System.create({
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
          creditType,
          registrationDate,
          indicatorJudged,
          consolidatedValue,
        },
      });

    return newSocialSecurity;
  }
}

export { PrismaSocialSecurityRepository };
