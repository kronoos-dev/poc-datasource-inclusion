import { Ceep, Prisma } from "@prisma/client";

interface ICeepsRepository {
  create(data: Prisma.CeepCreateInput): Promise<Ceep>;
  find(): Promise<Ceep[]>;
}

export { ICeepsRepository };
