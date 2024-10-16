import { CVMGeneralFrameworkOfDisallowedPersons, Prisma } from "@prisma/client";

interface IGeneralFrameworkOfDisallowedPersonsRepository {
  create(
    data: Prisma.CVMGeneralFrameworkOfDisallowedPersonsCreateInput
  ): Promise<CVMGeneralFrameworkOfDisallowedPersons>;
  find(): Promise<CVMGeneralFrameworkOfDisallowedPersons[]>;
}

export { IGeneralFrameworkOfDisallowedPersonsRepository };
