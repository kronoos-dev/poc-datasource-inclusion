import { IAppliedPenaltiesRepository } from "@modules/ceep/repositories/IAppliedPenaltiesRepository";

interface AppliedPenaltiesCreateInputPayload {
  id?: string;
  year: number;
  pregao: string;
  process: string;
  cnpj: string;
  bidder: string;
  object: string;
  conduct: string;
  impeditionFromBidding: string;
  fineValue: number;
}

class CreateAppliedPenaltiesUseCase {
  constructor(
    private appliedPenaltiesRepository: IAppliedPenaltiesRepository
  ) {}

  execute({
    year,
    pregao,
    process,
    cnpj,
    bidder,
    object,
    conduct,
    impeditionFromBidding,
    fineValue,
  }: AppliedPenaltiesCreateInputPayload) {
    const contractExecutionsAndCompetitionsPenalties =
      this.appliedPenaltiesRepository.create({
        year,
        pregao,
        process,
        cnpj,
        bidder,
        object,
        conduct,
        impeditionFromBidding,
        fineValue,
      });

    return contractExecutionsAndCompetitionsPenalties;
  }
}

export { CreateAppliedPenaltiesUseCase };
