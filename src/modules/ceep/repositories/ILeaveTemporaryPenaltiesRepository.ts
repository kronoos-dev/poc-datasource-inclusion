import { CVMLeaveTemporaryPenalties, Prisma } from "@prisma/client";

interface ILeaveTemporaryPenaltiesRepository {
  create(
    data: Prisma.CVMLeaveTemporaryPenaltiesCreateInput
  ): Promise<CVMLeaveTemporaryPenalties>;
  find(): Promise<CVMLeaveTemporaryPenalties[]>;
}

export { ILeaveTemporaryPenaltiesRepository };
