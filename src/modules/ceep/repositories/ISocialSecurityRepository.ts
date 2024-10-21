import { Prisma, socialSecurityDebt_Debt_System } from "@prisma/client";

interface ISocialSecurityRepository {
  create(
    data: Prisma.socialSecurityDebt_Debt_SystemCreateInput
  ): Promise<socialSecurityDebt_Debt_System>;
  find(): Promise<socialSecurityDebt_Debt_System[]>;
}

export { ISocialSecurityRepository };
