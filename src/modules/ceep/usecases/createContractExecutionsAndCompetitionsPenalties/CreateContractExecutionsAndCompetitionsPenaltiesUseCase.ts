import { IContractExecutionsAndCompetitionsPenaltiesRepository } from "@modules/ceep/repositories/IContractExecutionsAndCompetitionsPenaltiesRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface ContractExecutionsAndCompetitionsPenaltiesCreateInputPayload {
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
  legalIndicator: string;
  consolidatedValue: number;
}

class CreateContractExecutionsAndCompetitionsPenaltiesUseCase {
  constructor(
    private contractExecutionsAndCompetitionsPenaltiesRepository: IContractExecutionsAndCompetitionsPenaltiesRepository
  ) {}

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
    legalIndicator,
    consolidatedValue,
  }: ContractExecutionsAndCompetitionsPenaltiesCreateInputPayload) {
    const contractExecutionsAndCompetitionsPenalties =
      this.contractExecutionsAndCompetitionsPenaltiesRepository.create({
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
        legalIndicator,
        consolidatedValue,
      });

    return contractExecutionsAndCompetitionsPenalties;
  }
}

export { CreateContractExecutionsAndCompetitionsPenaltiesUseCase };
