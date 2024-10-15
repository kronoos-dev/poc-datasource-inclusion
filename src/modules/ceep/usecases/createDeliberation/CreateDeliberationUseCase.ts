import { IDeliberationsRepository } from "@modules/ceep/repositories/IDeliberationsRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface CVMDeliberationCreateInputPayload {
  id?: string;
  title: string;
  description: string;
  dateJudgementSession: Date | string;
  pdfUrl: string;
  docUrl: string;
}

class CreateCVMDeliberationUseCase {
  constructor(private deliberationsRepository: IDeliberationsRepository) {}

  execute({
    title,
    description,
    dateJudgementSession,
    pdfUrl,
    docUrl,
  }: CVMDeliberationCreateInputPayload) {
    const ceep = this.deliberationsRepository.create({
      title,
      description,
      dateJudgementSession: getDateTimeFromString(
        dateJudgementSession as string
      ),
      pdfUrl,
      docUrl,
    });

    return ceep;
  }
}

export { CreateCVMDeliberationUseCase };
