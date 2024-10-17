import { PrismaJudgedSanctioningProceedingsRepository } from "@modules/ceep/repositories/implementations/PrismaJudgedSanctioningProceedingsRepository";
import { CreateCVMJudgedSanctioningProceedingsUseCase } from "@modules/ceep/usecases/createJudgedSanctioningProceedings/CreateCVMJudgedSanctioningProceedingsUseCase";
import Bull from "bull";

const createJudgedSanctioningProceedingsQueue = new Bull(
  "createJudgedSanctioningProceedingsQueue",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createJudgedSanctioningProceedingsQueue.process(async (job) => {
  const { title, description, judgmentSessionDate, pdfUrl } = job.data;

  const judgedSanctioningProceedingsRepository =
    PrismaJudgedSanctioningProceedingsRepository.getInstance();
  const createCVMJudgedSanctioningProceedingsUseCase =
    new CreateCVMJudgedSanctioningProceedingsUseCase(
      judgedSanctioningProceedingsRepository
    );

  try {
    const result = await createCVMJudgedSanctioningProceedingsUseCase.execute({
      title,
      description,
      judgmentSessionDate,
      pdfUrl,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createJudgedSanctioningProceedings - Queue is running...");

export { createJudgedSanctioningProceedingsQueue };
