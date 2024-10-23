import { PrismaAppliedPenaltiesRepository } from "@modules/ceep/repositories/implementations/PrismaAppliedPenaltiesRepository";
import { CreateAppliedPenaltiesUseCase } from "@modules/ceep/usecases/createAppliedPenalties/CreateAppliedPenaltiesUseCase";
import Bull from "bull";

const createAppliedPenaltiesQueue = new Bull(
  "createAppliedPenalties",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createAppliedPenaltiesQueue.process(async (job) => {
  const {
    ANO,
    PREGAO,
    PROCESSO,
    CNPJ,
    LICITANTE,
    OBJETO,
    CONDUTA,
    IMPEDIMENTO_DE_LICITAR,
    VALOR_MULTA,
  } = job.data;

  const appliedPenaltiesRepository =
    PrismaAppliedPenaltiesRepository.getInstance();
  const createContractExecutionsAndCompetitionsPenaltiesUseCase =
    new CreateAppliedPenaltiesUseCase(appliedPenaltiesRepository);

  try {
    const result =
      await createContractExecutionsAndCompetitionsPenaltiesUseCase.execute({
        year: ANO,
        pregao: PREGAO,
        process: PROCESSO,
        cnpj: CNPJ,
        bidder: LICITANTE,
        object: OBJETO,
        conduct: CONDUTA,
        impeditionFromBidding: IMPEDIMENTO_DE_LICITAR,
        fineValue: VALOR_MULTA,
      });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createAppliedPenalties - Queue is running...");

export { createAppliedPenaltiesQueue };
