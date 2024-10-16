import {
  CVMGeneralFrameworkofPersonsProhibitedFromActing,
  Prisma,
} from "@prisma/client";

interface IGeneralFrameworkOfPersonsProhibitedFromActingRepository {
  create(
    data: Prisma.CVMGeneralFrameworkofPersonsProhibitedFromActingCreateInput
  ): Promise<CVMGeneralFrameworkofPersonsProhibitedFromActing>;
  find(): Promise<CVMGeneralFrameworkofPersonsProhibitedFromActing[]>;
}

export { IGeneralFrameworkOfPersonsProhibitedFromActingRepository };
