import { IFgtsDebtRepository } from "@modules/ceep/repositories/IFgtsDebtRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface SanctionedCompaniesCreateInputPayload {
  id?: string;
  cpfCnpj: string;
  personType: string;
  debtorType: string;
  debtorName: string;
  responsibleUnitState: string;
  responsibleUnit: string;
  responsibleEntity: string;
  registrationUnit: string;
  registrationNumber: string;
  registrationSituationType: string;
  registrationSituation: string;
  mainRevenue: string;
  registrationDate: Date | string;
  indicatorJudged: boolean;
  consolidatedValue: number;
}

class CreateFgtsDebtUseCase {
  constructor(private fgtsDebtRepository: IFgtsDebtRepository) {}

  execute({
    cpfCnpj,
    personType,
    debtorType,
    debtorName,
    responsibleUnitState,
    responsibleUnit,
    responsibleEntity,
    registrationUnit,
    registrationNumber,
    registrationSituationType,
    registrationSituation,
    mainRevenue,
    registrationDate,
    indicatorJudged,
    consolidatedValue,
  }: SanctionedCompaniesCreateInputPayload) {
    const fgtsDebt = this.fgtsDebtRepository.create({
      cpfCnpj,
      personType,
      debtorType,
      debtorName,
      responsibleUnitState,
      responsibleUnit,
      responsibleEntity,
      registrationUnit,
      registrationNumber,
      registrationSituationType,
      registrationSituation,
      mainRevenue,
      registrationDate: getDateTimeFromString(registrationDate as string),
      indicatorJudged,
      consolidatedValue,
    });

    return fgtsDebt;
  }
}

export { CreateFgtsDebtUseCase };
