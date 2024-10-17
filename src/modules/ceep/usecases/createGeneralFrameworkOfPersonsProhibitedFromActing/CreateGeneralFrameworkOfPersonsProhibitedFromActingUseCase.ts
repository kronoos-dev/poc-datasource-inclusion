import { IGeneralFrameworkOfPersonsProhibitedFromActingRepository } from "@modules/ceep/repositories/IGeneralFrameworkOfPersonsProhibitedFromActingRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface CVMGeneralFrameworkOfPersonsProhibitedFromActingInputPayload {
  id?: string;
  pas: string;
  name: string;
  cpfCnpj: string;
  penalty: string;
  termInYears: number;
  startOfPenaltyTerm: Date | string;
  endOfPenaltyTerm: Date | string;
}

class CreateCVMGeneralFrameworkOfPersonsProhibitedFromActingUseCase {
  constructor(
    private generalFrameworkOfPersonsProhibitedFromActingRepository: IGeneralFrameworkOfPersonsProhibitedFromActingRepository
  ) {}

  execute({
    pas,
    name,
    cpfCnpj,
    penalty,
    termInYears,
    startOfPenaltyTerm,
    endOfPenaltyTerm,
  }: CVMGeneralFrameworkOfPersonsProhibitedFromActingInputPayload) {
    const generalFrameworkOfPersonsProhibitedFromActing =
      this.generalFrameworkOfPersonsProhibitedFromActingRepository.create({
        pas,
        name,
        cpfCnpj,
        penalty,
        termInYears: Number(termInYears),
        startOfPenaltyTerm: getDateTimeFromString(startOfPenaltyTerm as string, '-'),
        endOfPenaltyTerm: getDateTimeFromString(endOfPenaltyTerm as string, '-'),
      });

    return generalFrameworkOfPersonsProhibitedFromActing;
  }
}

export { CreateCVMGeneralFrameworkOfPersonsProhibitedFromActingUseCase };
