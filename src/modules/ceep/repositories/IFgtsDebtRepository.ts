import { FGTSDebt, Prisma } from "@prisma/client";

interface IFgtsDebtRepository {
  create(data: Prisma.FGTSDebtCreateInput): Promise<FGTSDebt>;
  find(): Promise<FGTSDebt[]>;
}

export { IFgtsDebtRepository };
