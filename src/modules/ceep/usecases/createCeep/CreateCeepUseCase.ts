import { ICeepsRepository } from "@modules/ceep/repositories/ICeepRepository";
import { stringPortugueseToBoolean } from "@utils/booleanParse";
import { getDateTimeFromString } from "@utils/dateParse";
import { removeSeparatorCnpj } from "@utils/documentParse";

interface CeepCreateInputPayload {
  id?: string;
  cnpj: string;
  corporateName: string;
  sanctionDescription: string;
  sanctionDate: Date | string;
  leeniencyAgreement: string;
  disagreementDeal: string;
}

class CreateCeepUseCase {
  constructor(private ceepsRepository: ICeepsRepository) {}

  execute({
    cnpj,
    corporateName,
    sanctionDescription,
    sanctionDate,
    leeniencyAgreement,
    disagreementDeal,
  }: CeepCreateInputPayload) {
    const ceep = this.ceepsRepository.create({
      cnpj: removeSeparatorCnpj(cnpj),
      corporateName,
      sanctionDescription,
      sanctionDate: getDateTimeFromString(sanctionDate as string),
      leeniencyAgreement: stringPortugueseToBoolean(leeniencyAgreement),
      disagreementDeal: stringPortugueseToBoolean(disagreementDeal),
    });

    return ceep;
  }
}

export { CreateCeepUseCase };
