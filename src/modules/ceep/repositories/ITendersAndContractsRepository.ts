import { Prisma, tendersAndContracts } from "@prisma/client";

interface ITendersAndContractsRepository {
  create(
    data: Prisma.tendersAndContractsCreateInput
  ): Promise<tendersAndContracts>;
  find(): Promise<tendersAndContracts[]>;
}

export { ITendersAndContractsRepository };
