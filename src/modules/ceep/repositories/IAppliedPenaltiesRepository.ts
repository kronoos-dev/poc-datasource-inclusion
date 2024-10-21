import { appliedPenalties, Prisma } from "@prisma/client";

interface IAppliedPenaltiesRepository {
  create(data: Prisma.appliedPenaltiesCreateInput): Promise<appliedPenalties>;
  find(): Promise<appliedPenalties[]>;
}

export { IAppliedPenaltiesRepository };
