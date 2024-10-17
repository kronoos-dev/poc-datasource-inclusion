import { ICelebratedDealsRepository } from "@modules/ceep/repositories/ICelebratedDealsRepository";

interface CelebratedDealsCreateInputPayload {
  id?: string;
  year: number;
  companyName: string;
  agreedValue: number;
  attachments: string[];
}

class CreateCelebratedDealsUseCase {
  constructor(private celebratedDealsRepository: ICelebratedDealsRepository) {}

  execute({
    year,
    companyName,
    agreedValue,
    attachments,
  }: CelebratedDealsCreateInputPayload) {
    const celebratedDeal = this.celebratedDealsRepository.create({
      year,
      companyName,
      agreedValue,
      attachments,
    });

    return celebratedDeal;
  }
}

export { CreateCelebratedDealsUseCase };
