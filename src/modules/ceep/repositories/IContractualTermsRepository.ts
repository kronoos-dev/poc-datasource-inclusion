import { Prisma, contractualTerms } from "@prisma/client";

interface IContractualTermsRepository {
  create(data: Prisma.contractualTermsCreateInput): Promise<contractualTerms>;
  find(): Promise<contractualTerms[]>;
}

export { IContractualTermsRepository };
