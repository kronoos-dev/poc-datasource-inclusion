import { IJudgedSanctioningProceedingsRepository } from "@modules/ceep/repositories/IJudgedSanctioningProceedingsRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface CVMJudgedSanctioningProceedingsCreateInputPayload {
  id?: string;
  title: string;
  description: string;
  judgmentSessionDate: Date | string;
  pdfUrl: string;
}

class CreateCVMJudgedSanctioningProceedingsUseCase {
  constructor(
    private judgedSanctioningProceedingsRepository: IJudgedSanctioningProceedingsRepository
  ) {}

  execute({
    title,
    description,
    judgmentSessionDate,
    pdfUrl,
  }: CVMJudgedSanctioningProceedingsCreateInputPayload) {
    const judgedSanctioningProceeding =
      this.judgedSanctioningProceedingsRepository.create({
        title,
        description,
        judgmentSessionDate: getDateTimeFromString(
          judgmentSessionDate as string
        ),
        pdfUrl,
      });

    return judgedSanctioningProceeding;
  }
}

export { CreateCVMJudgedSanctioningProceedingsUseCase };
