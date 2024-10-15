import { CVMDeliberations, Prisma } from "@prisma/client";

interface IDeliberationsRepository {
  create(data: Prisma.CVMDeliberationsCreateInput): Promise<CVMDeliberations>;
  find(): Promise<CVMDeliberations[]>;
}

export { IDeliberationsRepository };
