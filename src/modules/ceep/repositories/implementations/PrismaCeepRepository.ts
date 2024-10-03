import { Prisma, ceep_datasource } from "@prisma/client";
import { ICeepsRepository } from "../ICeepRepository";

// TODO, resolver paths
import { prisma } from "../../../../lib/prisma";
import { getDateTimeFromString } from "../../../../utils/dateParse";

class PrismaCeepRepository implements ICeepsRepository {

  private static INSTANCE: PrismaCeepRepository;

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
  }: Prisma.ceep_datasourceCreateInput): Promise<ceep_datasource> {
    
    const newCeep = await prisma.ceep_datasource.create({
      data: {
        cnpj,
        corporateName,
        sanctionDescription,
        // TODO, resolver tipagem
        sanctionDate: getDateTimeFromString(sanctionDate as string),
        leeniencyAgreement,
        disagreementDeal
      },
    });

    return newCeep
  }

}

export { PrismaCeepRepository };
