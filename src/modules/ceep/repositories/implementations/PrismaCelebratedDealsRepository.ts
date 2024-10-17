import { prisma } from "@lib/prisma";
import { Prisma, celebratedDeals } from "@prisma/client";
import { ICelebratedDealsRepository } from "../ICelebratedDealsRepository";

class PrismaCelebratedDealsRepository implements ICelebratedDealsRepository {
  private static INSTANCE: PrismaCelebratedDealsRepository;

  async find(): Promise<celebratedDeals[]> {
    const leaveTemporaryPenaltiesList = await prisma.celebratedDeals.findMany();

    return leaveTemporaryPenaltiesList;
  }

  public static getInstance(): PrismaCelebratedDealsRepository {
    if (!PrismaCelebratedDealsRepository.INSTANCE) {
      PrismaCelebratedDealsRepository.INSTANCE =
        new PrismaCelebratedDealsRepository();
    }

    return PrismaCelebratedDealsRepository.INSTANCE;
  }

  async create({
    year,
    companyName,
    agreedValue,
    attachments,
  }: Prisma.celebratedDealsCreateInput): Promise<celebratedDeals> {
    const newLeaveTemporaryPenaltiesList = await prisma.celebratedDeals.create({
      data: {
        year,
        companyName,
        agreedValue,
        attachments,
      },
    });

    return newLeaveTemporaryPenaltiesList;
  }
}

export { PrismaCelebratedDealsRepository };
