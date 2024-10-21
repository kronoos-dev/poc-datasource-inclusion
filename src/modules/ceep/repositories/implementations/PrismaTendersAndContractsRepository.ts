import { prisma } from "@lib/prisma";
import { Prisma, tendersAndContracts } from "@prisma/client";
import { ITendersAndContractsRepository } from "../ITendersAndContractsRepository";

class PrismaTendersAndContractsRepository
  implements ITendersAndContractsRepository
{
  private static INSTANCE: PrismaTendersAndContractsRepository;

  async find(): Promise<tendersAndContracts[]> {
    const tendersAndContractsList = await prisma.tendersAndContracts.findMany();

    return tendersAndContractsList;
  }

  public static getInstance(): PrismaTendersAndContractsRepository {
    if (!PrismaTendersAndContractsRepository.INSTANCE) {
      PrismaTendersAndContractsRepository.INSTANCE =
        new PrismaTendersAndContractsRepository();
    }

    return PrismaTendersAndContractsRepository.INSTANCE;
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
  }: Prisma.tendersAndContractsCreateInput): Promise<tendersAndContracts> {
    const newTendersAndContracts = await prisma.tendersAndContracts.create({
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

    return newTendersAndContracts;
  }
}

export { PrismaTendersAndContractsRepository };
