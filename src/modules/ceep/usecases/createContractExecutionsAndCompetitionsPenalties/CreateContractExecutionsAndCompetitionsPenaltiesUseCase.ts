import { IContractExecutionsAndCompetitionsPenaltiesRepository } from "@modules/ceep/repositories/IContractExecutionsAndCompetitionsPenaltiesRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface ContractExecutionsAndCompetitionsPenaltiesCreateInputPayload {
  id?: string;
  modality: string;
  yearNumber: string;
  object: string;
  originalProcessNumber: string;
  contractualTerm: string;
  biddingStatus: string;
  estimatedValue: number;
}

class CreateContractExecutionsAndCompetitionsPenaltiesUseCase {
  constructor(
    private contractExecutionsAndCompetitionsPenaltiesRepository: IContractExecutionsAndCompetitionsPenaltiesRepository
  ) {}

  execute({
    modality,
    yearNumber,
    object,
    originalProcessNumber,
    contractualTerm,
    biddingStatus,
    estimatedValue,
  }: ContractExecutionsAndCompetitionsPenaltiesCreateInputPayload) {
    const contractExecutionsAndCompetitionsPenalties =
      this.contractExecutionsAndCompetitionsPenaltiesRepository.create({
        modality,
        yearNumber,
        object,
        originalProcessNumber,
        contractualTerm,
        biddingStatus,
        estimatedValue,
      });

    return contractExecutionsAndCompetitionsPenalties;
  }
}

export { CreateContractExecutionsAndCompetitionsPenaltiesUseCase };
