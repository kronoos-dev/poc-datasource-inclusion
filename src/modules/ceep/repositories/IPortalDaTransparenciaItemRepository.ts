import { PortalDaTransparenciaItem, Prisma } from "@prisma/client";

interface IPortalDaTrasparenciaItemRepository {
  create(data: Prisma.PortalDaTransparenciaItemCreateInput): Promise<PortalDaTransparenciaItem>;
}

export { IPortalDaTrasparenciaItemRepository };

