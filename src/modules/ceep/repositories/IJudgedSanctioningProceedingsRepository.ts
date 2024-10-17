import { CVMJudgedSanctioningProceedings, Prisma } from "@prisma/client";

interface IJudgedSanctioningProceedingsRepository {
  create(
    data: Prisma.CVMJudgedSanctioningProceedingsCreateInput
  ): Promise<CVMJudgedSanctioningProceedings>;
  find(): Promise<CVMJudgedSanctioningProceedings[]>;
}

export { IJudgedSanctioningProceedingsRepository };
