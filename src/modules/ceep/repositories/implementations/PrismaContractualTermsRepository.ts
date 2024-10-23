import { prisma } from "@lib/prisma";
import { Prisma, contractualTerms } from "@prisma/client";
import { IContractualTermsRepository } from "../IContractualTermsRepository";

class PrismaContractualTermsRepository implements IContractualTermsRepository {
  private static INSTANCE: PrismaContractualTermsRepository;

  async find(): Promise<contractualTerms[]> {
    const contractualTermsList = await prisma.contractualTerms.findMany();

    return contractualTermsList;
  }

  public static getInstance(): PrismaContractualTermsRepository {
    if (!PrismaContractualTermsRepository.INSTANCE) {
      PrismaContractualTermsRepository.INSTANCE =
        new PrismaContractualTermsRepository();
    }

    return PrismaContractualTermsRepository.INSTANCE;
  }

  async create({
    contractualTerm,
    supplier,
    object,
    supervisionUnits,
    signatureDate,
    validityDateStart,
    validityDateEnd,
    extendable,
    maximumValidityDate,
    initialValue,
    updatedTotalValue,
    biddingType,
    biddingNumber,
    biddingYear,
    originProcess,
  }: Prisma.contractualTermsCreateInput): Promise<contractualTerms> {
    const newContractualTerms = await prisma.contractualTerms.create({
      data: {
        contractualTerm,
        supplier,
        object,
        supervisionUnits,
        signatureDate,
        validityDateStart,
        validityDateEnd,
        extendable,
        maximumValidityDate,
        initialValue,
        updatedTotalValue,
        biddingType,
        biddingNumber,
        biddingYear,
        originProcess,
      },
    });

    return newContractualTerms;
  }
}

export { PrismaContractualTermsRepository };
