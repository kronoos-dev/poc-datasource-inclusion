import { prisma } from "@lib/prisma";
import { Prisma, sanctionedCompanies } from "@prisma/client";
import { ISanctionedCompaniesRepository } from "../ISanctionedCompaniesRepository";

class PrismaSanctionedCompaniesRepository
  implements ISanctionedCompaniesRepository
{
  private static INSTANCE: PrismaSanctionedCompaniesRepository;

  async find(): Promise<sanctionedCompanies[]> {
    const sanctionedCompaniesList = await prisma.sanctionedCompanies.findMany();

    return sanctionedCompaniesList;
  }

  public static getInstance(): PrismaSanctionedCompaniesRepository {
    if (!PrismaSanctionedCompaniesRepository.INSTANCE) {
      PrismaSanctionedCompaniesRepository.INSTANCE =
        new PrismaSanctionedCompaniesRepository();
    }

    return PrismaSanctionedCompaniesRepository.INSTANCE;
  }

  async create({
    processNumber,
    company,
    cnpj,
    contractNumber,
    object,
    sanctionType,
    sanctionDetail,
    fineValue,
    debitValue,
    legalFundament,
    sicafRegistrationDate,
    sanctionStartDate,
    sanctionEndDate,
  }: Prisma.sanctionedCompaniesCreateInput): Promise<sanctionedCompanies> {
    const newTendersAndContracts = await prisma.sanctionedCompanies.create({
      data: {
        processNumber,
        company,
        cnpj,
        contractNumber,
        object,
        sanctionType,
        sanctionDetail,
        fineValue,
        debitValue,
        legalFundament,
        sicafRegistrationDate,
        sanctionStartDate,
        sanctionEndDate,
      },
    });

    return newTendersAndContracts;
  }
}

export { PrismaSanctionedCompaniesRepository };
