import { ILeaveTemporaryPenaltiesRepository } from "@modules/ceep/repositories/ILeaveTemporaryPenaltiesRepository";
import { getDateTimeFromString } from "@utils/dateParse";

interface CVMLeaveTemporaryPenaltiesCreateInputPayload {
  id?: string;
  processId: string;
  participant: string;
  decisionType: string;
  CVMjudgementDate: Date | string;
  effectiveDateOfPenalty: Date | string;
  leavePeriod: string;
  decision: string;
}

class CreateCVMLeaveTemporaryPenaltiesUseCase {
  constructor(
    private leaveTemporaryPenaltiesRepository: ILeaveTemporaryPenaltiesRepository
  ) {}

  execute({
    processId,
    participant,
    decisionType,
    CVMjudgementDate,
    effectiveDateOfPenalty,
    leavePeriod,
    decision,
  }: CVMLeaveTemporaryPenaltiesCreateInputPayload) {
    const leaveTemporaryPenalties =
      this.leaveTemporaryPenaltiesRepository.create({
        processId,
        participant,
        decisionType,
        CVMjudgementDate: getDateTimeFromString(CVMjudgementDate as string),
        effectiveDateOfPenalty: getDateTimeFromString(
          effectiveDateOfPenalty as string
        ),
        leavePeriod,
        decision,
      });

    return leaveTemporaryPenalties;
  }
}

export { CreateCVMLeaveTemporaryPenaltiesUseCase };
