import { PrismaLeaveTemporaryPenaltiesRepository } from "@modules/ceep/repositories/implementations/PrismaLeaveTemporaryPenaltiesRepository";
import { CreateCVMLeaveTemporaryPenaltiesUseCase } from "@modules/ceep/usecases/createLeaveTemporaryPenalties/CreateCVMLeaveTemporaryPenaltiesUseCase";
import Bull from "bull";

const createLeaveTemporaryPenaltiesQueue = new Bull(
  "createLeaveTemporaryPenalties",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createLeaveTemporaryPenaltiesQueue.process(async (job) => {
  const {
    processId,
    participant,
    decisionType,
    CVMjudgementDate,
    effectiveDateOfPenalty,
    leavePeriod,
    decision,
  } = job.data;

  const leaveTemporaryPenaltiesRepository =
    PrismaLeaveTemporaryPenaltiesRepository.getInstance();
  const createCVMLeaveTemporaryPenaltiesUseCase =
    new CreateCVMLeaveTemporaryPenaltiesUseCase(
      leaveTemporaryPenaltiesRepository
    );

  try {
    const result = await createCVMLeaveTemporaryPenaltiesUseCase.execute({
      processId,
      participant,
      decisionType,
      CVMjudgementDate,
      effectiveDateOfPenalty,
      leavePeriod,
      decision,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createLeaveTemporaryPenalties - Queue is running...");

export { createLeaveTemporaryPenaltiesQueue };
