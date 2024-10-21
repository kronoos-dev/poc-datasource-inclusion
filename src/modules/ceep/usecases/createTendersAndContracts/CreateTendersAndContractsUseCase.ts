import { ITendersAndContractsRepository } from "@modules/ceep/repositories/ITendersAndContractsRepository";
import { getDateTimeFromString } from "@utils/dateParse";

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
    const tendersAndContracts = this.tendersAndContractsRepository.create({
      contractualTerm,
      supplier,
      object,
      supervisionUnits,
      signatureDate: getDateTimeFromString(signatureDate as string),
      validityDateStart: getDateTimeFromString(validityDateStart as string),
      validityDateEnd: getDateTimeFromString(validityDateEnd as string),
      extendable,
      maximumValidityDate: getDateTimeFromString(maximumValidityDate as string),
      initialValue,
      updatedTotalValue,
      biddingType,
      biddingNumber,
      biddingYear,
      originProcess,
    });

    return tendersAndContracts;
  }
}

export { CreateTendersAndContractsUseCase };
