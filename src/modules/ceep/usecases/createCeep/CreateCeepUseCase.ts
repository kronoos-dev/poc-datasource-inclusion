import { ICeepsRepository } from "@modules/ceep/repositories/ICeepRepository";
import { Prisma } from "@prisma/client";
import { getDateTimeFromString } from "@utils/dateParse";

class CreateCeepUseCase {
  constructor(private ceepsRepository: ICeepsRepository) {}

  execute({
    cnpj,
    corporateName,
    sanctionDescription,
    sanctionDate,
    leeniencyAgreement,
    disagreementDeal,
  }: Prisma.CeepCreateInput) {
    const ceep = this.ceepsRepository.create({
      cnpj,
      corporateName,
      sanctionDescription,
      sanctionDate: getDateTimeFromString(sanctionDate as string),
      leeniencyAgreement,
      disagreementDeal,
    });

    return ceep;
  }
}

export { CreateCeepUseCase };
