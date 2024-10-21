import { ISocialSecurityRepository } from "@modules/ceep/repositories/ISocialSecurityRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface SocialSecurityInputPayload {
  id?: string;
  cpfCnpj: string;
  personType: string;
  debtorType: string;
  debtorName: string;
  debtorState: string;
  responsibleUnit: string;
  registrationNumber: string;
  registrationSituationType: string;
  registrationSituation: string;
  creditType: string;
  registrationDate: Date | string;
  indicatorJudged: boolean;
  consolidatedValue: number;
}

class CreateSocialSecurityUseCase {
  constructor(private socialSecurityRepository: ISocialSecurityRepository) {}

  execute({
    cpfCnpj,
    personType,
    debtorType,
    debtorName,
    debtorState,
    responsibleUnit,
    registrationNumber,
    registrationSituationType,
    registrationSituation,
    creditType,
    registrationDate,
    indicatorJudged,
    consolidatedValue,
  }: SocialSecurityInputPayload) {
    const fgtsDebt = this.socialSecurityRepository.create({
      cpfCnpj,
      personType,
      debtorType,
      debtorName,
      debtorState,
      responsibleUnit,
      registrationNumber,
      registrationSituationType,
      registrationSituation,
      creditType,
      indicatorJudged,
      consolidatedValue,
      registrationDate: getDateTimeFromString(registrationDate as string),
    });

    return fgtsDebt;
  }
}

export { CreateSocialSecurityUseCase };
