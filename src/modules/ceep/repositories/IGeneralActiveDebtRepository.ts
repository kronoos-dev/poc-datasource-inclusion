import { generalActiveDebt_SIDA_System, Prisma } from "@prisma/client";

interface IGeneralActiveDebtRepository {
  create(
    data: Prisma.generalActiveDebt_SIDA_SystemCreateInput
  ): Promise<generalActiveDebt_SIDA_System>;
  find(): Promise<generalActiveDebt_SIDA_System[]>;
}

export { IGeneralActiveDebtRepository };
