import { ISanctionedCompaniesRepository } from "@modules/ceep/repositories/ISanctionedCompaniesRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface SanctionedCompaniesCreateInputPayload {
  id?: string;
  processNumber: string;
  company: string;
  cnpj: string;
  contractNumber: string;
  object: string;
  sanctionType: string;
  sanctionDetail: string;
  fineValue: number;
  debitValue: number;
  legalFundament: string;
  sicafRegistrationDate: Date | string;
  sanctionStartDate: Date | string;
  sanctionEndDate: Date | string;
}

class CreateSanctionedCompaniesUseCase {
  constructor(
    private sanctionedCompaniesRepository: ISanctionedCompaniesRepository
  ) {}

  execute({
    processNumber,
    company,
    cnpj,
    contractNumber,
    object,
    sanctionType,
    sanctionDetail,
    fineValue,
    debitValue,
    legalFundament,
    sicafRegistrationDate,
    sanctionStartDate,
    sanctionEndDate,
  }: SanctionedCompaniesCreateInputPayload) {
    const sanctionedCompanies = this.sanctionedCompaniesRepository.create({
      processNumber,
      company,
      cnpj,
      contractNumber,
      object,
      sanctionType,
      sanctionDetail,
      fineValue,
      debitValue,
      legalFundament,
      sicafRegistrationDate: getDateTimeFromString(
        sicafRegistrationDate as string
      ),
      sanctionStartDate: getDateTimeFromString(sanctionStartDate as string),
      sanctionEndDate: getDateTimeFromString(sanctionEndDate as string),
    });

    return sanctionedCompanies;
  }
}

export { CreateSanctionedCompaniesUseCase };
