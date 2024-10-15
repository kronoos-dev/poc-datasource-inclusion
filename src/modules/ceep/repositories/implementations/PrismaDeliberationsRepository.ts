import { prisma } from "@lib/prisma";
import { Prisma, CVMDeliberations } from "@prisma/client";

import { IDeliberationsRepository } from "../IDeliberationsRepository";

class PrismaDeliberationsRepository implements IDeliberationsRepository {
  private static INSTANCE: PrismaDeliberationsRepository;

  async find(): Promise<CVMDeliberations[]> {
    const deliberationsList = await prisma.cVMDeliberations.findMany();

    return deliberationsList;
  }

  public static getInstance(): PrismaDeliberationsRepository {
    if (!PrismaDeliberationsRepository.INSTANCE) {
      PrismaDeliberationsRepository.INSTANCE =
        new PrismaDeliberationsRepository();
    }

    return PrismaDeliberationsRepository.INSTANCE;
  }

  async create({
    title,
    description,
    dateJudgementSession,
    pdfUrl,
    docUrl,
  }: Prisma.CVMDeliberationsCreateInput): Promise<CVMDeliberations> {
    const newDeliberation = await prisma.cVMDeliberations.create({
      data: {
        title,
        description,
        dateJudgementSession,
        pdfUrl,
        docUrl,
      },
    });

    return newDeliberation;
  }
}

export { PrismaDeliberationsRepository };
