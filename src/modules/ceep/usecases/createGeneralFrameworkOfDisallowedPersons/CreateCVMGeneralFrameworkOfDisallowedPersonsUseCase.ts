import { IGeneralFrameworkOfDisallowedPersonsRepository } from "@modules/ceep/repositories/IGeneralFrameworkOfDisallowedPersonsRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface CVMGeneralFrameworkOfDisallowedPersonsInputPayload {
  id?: string;
  pas: string;
  name: string;
  cpf: string;
  penalty: string;
  termInYears: number;
  startOfPenaltyTerm: Date | string;
  endOfPenaltyTerm: Date | string;
}

class CreateCVMGeneralFrameworkOfDisallowedPersonsUseCase {
  constructor(
    private generalFrameworkOfDisallowedPersonsRepository: IGeneralFrameworkOfDisallowedPersonsRepository
  ) {}

  execute({
    pas,
    name,
    cpf,
    penalty,
    termInYears,
    startOfPenaltyTerm,
    endOfPenaltyTerm,
  }: CVMGeneralFrameworkOfDisallowedPersonsInputPayload) {
    const generalFrameworkOfDisallowedPersons =
      this.generalFrameworkOfDisallowedPersonsRepository.create({
        pas,
        name,
        cpf,
        penalty,
        termInYears,
        startOfPenaltyTerm: getDateTimeFromString(startOfPenaltyTerm as string),
        endOfPenaltyTerm: getDateTimeFromString(endOfPenaltyTerm as string),
      });

    return generalFrameworkOfDisallowedPersons;
  }
}

export { CreateCVMGeneralFrameworkOfDisallowedPersonsUseCase };
