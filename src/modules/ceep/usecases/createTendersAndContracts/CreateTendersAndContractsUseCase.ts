import { ITendersAndContractsRepository } from "@modules/ceep/repositories/ITendersAndContractsRepository";

interface TendersAndContractsCreateInputPayload {
  id?: string;
  contractualTerm: string;
  supplier: string;
  object: string;
  supervisionUnits: string;
  signatureDate: Date | string;
  validityDateStart: Date | string;
  validityDateEnd: Date | string;
  extendable: boolean;
  maximumValidityDate: Date | string;
  initialValue: number;
  updatedTotalValue: number;
  biddingType: string;
  biddingNumber: number;
  biddingYear: number;
  originProcess: string;
}

class CreateTendersAndContractsUseCase {
  constructor(
    private tendersAndContractsRepository: ITendersAndContractsRepository
  ) {}

  execute({
    contractualTerm,
    supplier,
    object,
    supervisionUnits,
    signatureDate,
    validityDateStart,
    validityDateEnd,
    extendable,
    maximumValidityDate,
    initialValue,
    updatedTotalValue,
    biddingType,
    biddingNumber,
    biddingYear,
    originProcess,
  }: TendersAndContractsCreateInputPayload) {
    const contractExecutionsAndCompetitionsPenalties =
      this.tendersAndContractsRepository.create({
        contractualTerm,
        supplier,
        object,
        supervisionUnits,
        signatureDate,
        validityDateStart,
        validityDateEnd,
        extendable,
        maximumValidityDate,
        initialValue,
        updatedTotalValue,
        biddingType,
        biddingNumber,
        biddingYear,
        originProcess,
      });

    return contractExecutionsAndCompetitionsPenalties;
  }
}

export { CreateTendersAndContractsUseCase };
