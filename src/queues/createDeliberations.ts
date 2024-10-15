import { PrismaCeepRepository } from "@modules/ceep/repositories/implementations/PrismaCeepRepository";
import { PrismaDeliberationsRepository } from "@modules/ceep/repositories/implementations/PrismaDeliberationsRepository";
import { CreateCeepUseCase } from "@modules/ceep/usecases/createCeep/CreateCeepUseCase";
import { CreateCVMDeliberationUseCase } from "@modules/ceep/usecases/createDeliberation/CreateDeliberationUseCase";
import Bull from "bull";

const createDeliberationsQueue = new Bull(
  "createDeliberations",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createDeliberationsQueue.process(async (job) => {
  const { title, description, dateJudgementSession, pdfUrl, docUrl } = job.data;

  const deliberationsRepository = PrismaDeliberationsRepository.getInstance();
  const createCVMDeliberationUseCase = new CreateCVMDeliberationUseCase(
    deliberationsRepository
  );

  try {
    const result = await createCVMDeliberationUseCase.execute({
      title,
      description,
      dateJudgementSession,
      pdfUrl,
      docUrl,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createDeliberations - Queue is running...");

export { createDeliberationsQueue };
