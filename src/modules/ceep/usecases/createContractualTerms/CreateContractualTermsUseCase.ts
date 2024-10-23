import { IContractualTermsRepository } from "@modules/ceep/repositories/IContractualTermsRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface ContractualTermsCreateInputPayload {
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
  initialValue: string;
  updatedTotalValue: string;
  biddingType: string;
  biddingNumber: number;
  biddingYear: number;
  originProcess: string;
}

class CreateContractualTermsUseCase {
  constructor(
    private contractualTermsRepository: IContractualTermsRepository
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
  }: ContractualTermsCreateInputPayload) {
    const contractualTerms = this.contractualTermsRepository.create({
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

    return contractualTerms;
  }
}

export { CreateContractualTermsUseCase };
