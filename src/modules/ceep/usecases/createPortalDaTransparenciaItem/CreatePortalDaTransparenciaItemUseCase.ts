import { IPortalDaTrasparenciaItemRepository } from '@modules/ceep/repositories/IPortalDaTransparenciaItemRepository';
import { Prisma } from '@prisma/client';

class CreatePortalDaTransparenciaItemUseCase {
  constructor(private PortalDaTransparenciaItemsRepository: IPortalDaTrasparenciaItemRepository) {}

  execute({
    resource,
    apiResponse
  }: Prisma.PortalDaTransparenciaItemCreateInput) {
    const portalDaTransparenciaItem = this.PortalDaTransparenciaItemsRepository.create({
      resource,
      apiResponse
    });

    return portalDaTransparenciaItem;
  }
}

export { CreatePortalDaTransparenciaItemUseCase };
