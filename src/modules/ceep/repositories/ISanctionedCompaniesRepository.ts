import { Prisma, sanctionedCompanies } from "@prisma/client";

interface ISanctionedCompaniesRepository {
  create(
    data: Prisma.sanctionedCompaniesCreateInput
  ): Promise<sanctionedCompanies>;
  find(): Promise<sanctionedCompanies[]>;
}

export { ISanctionedCompaniesRepository };
