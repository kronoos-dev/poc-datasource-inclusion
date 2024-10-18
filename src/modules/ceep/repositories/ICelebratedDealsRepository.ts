import { celebratedDeals, Prisma } from "@prisma/client";

interface ICelebratedDealsRepository {
  create(data: Prisma.celebratedDealsCreateInput): Promise<celebratedDeals>;
  find(): Promise<celebratedDeals[]>;
}

export { ICelebratedDealsRepository };
