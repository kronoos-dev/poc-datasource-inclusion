import { prisma } from "@lib/prisma";
import { Ceep, Prisma } from "@prisma/client";

import { ICeepsRepository } from "../ICeepRepository";

class PrismaCeepRepository implements ICeepsRepository {
  
  private static INSTANCE: PrismaCeepRepository;

  async find(): Promise<Ceep[]> {
    const ceepsList = await prisma.ceep.findMany()

    return ceepsList;
  }

  public static getInstance(): PrismaCeepRepository {
    if (!PrismaCeepRepository.INSTANCE) {
      PrismaCeepRepository.INSTANCE = new PrismaCeepRepository();
    }

    return PrismaCeepRepository.INSTANCE;
  }

  async create({
    cnpj,
    corporateName,
    sanctionDescription,
    sanctionDate,
    leeniencyAgreement,
    disagreementDeal
  }: Prisma.CeepCreateInput): Promise<Ceep> {
    
    const newCeep = await prisma.ceep.create({
      data: {
        cnpj,
        corporateName,
        sanctionDescription,
        sanctionDate,
        leeniencyAgreement,
        disagreementDeal
      },
    });

    return newCeep
  }

}

export { PrismaCeepRepository };
