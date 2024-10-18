import { prisma } from "@lib/prisma";
import { PortalDaTransparenciaItem, Prisma } from "@prisma/client";
import { IPortalDaTrasparenciaItemRepository } from "../IPortalDaTransparenciaItemRepository";

class PrismaPortalDaTransparenciaItemRepository implements IPortalDaTrasparenciaItemRepository {
  private static INSTANCE: PrismaPortalDaTransparenciaItemRepository;

  public static getInstance(): PrismaPortalDaTransparenciaItemRepository {
    if (!PrismaPortalDaTransparenciaItemRepository.INSTANCE) {
      PrismaPortalDaTransparenciaItemRepository.INSTANCE = new PrismaPortalDaTransparenciaItemRepository();
    }

    return PrismaPortalDaTransparenciaItemRepository.INSTANCE;
  }

  async create({
    resource,
    apiResponse
  }: Prisma.PortalDaTransparenciaItemCreateInput): Promise<PortalDaTransparenciaItem> {
    
    const newPortalDaTransparenciaItem = await prisma.portalDaTransparenciaItem.create({
      data: {
        resource,
        apiResponse
      },
    });

    return newPortalDaTransparenciaItem;
  }
}

export { PrismaPortalDaTransparenciaItemRepository };

