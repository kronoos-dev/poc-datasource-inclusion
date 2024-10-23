import { IGeneralActiveDebtRepository } from "@modules/ceep/repositories/IGeneralActiveDebtRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface GeneralActiveDebtInputPayload {
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
  mainRevenue: string;
  registrationDate: Date | string;
  indicatorJudged: boolean;
  consolidatedValue: number;
}

class CreateGeneralActiveDebtUseCase {
  constructor(private generalActiveDebt: IGeneralActiveDebtRepository) {}

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
    mainRevenue,
    registrationDate,
    indicatorJudged,
    consolidatedValue,
  }: GeneralActiveDebtInputPayload) {
    const generalActiveDebt = this.generalActiveDebt.create({
      cpfCnpj,
      personType,
      debtorType,
      debtorName,
      debtorState,
      responsibleUnit,
      registrationNumber,
      registrationSituationType,
      registrationSituation,
      mainRevenue,
      indicatorJudged,
      consolidatedValue,
      registrationDate: getDateTimeFromString(registrationDate as string),
    });

    return generalActiveDebt;
  }
}

export { CreateGeneralActiveDebtUseCase };
