import { PrismaContractExecutionsAndCompetitionsPenaltiesRepository } from "@modules/ceep/repositories/implementations/PrismaContractExecutionsAndCompetitionsPenaltiesRepository";
import { CreateContractExecutionsAndCompetitionsPenaltiesUseCase } from "@modules/ceep/usecases/createContractExecutionsAndCompetitionsPenalties/CreateContractExecutionsAndCompetitionsPenaltiesUseCase";
import Bull from "bull";

const createContractExecutionsAndCompetitionsPenaltiesQueue = new Bull(
  "createContractExecutionsAndCompetitionsPenalties",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createContractExecutionsAndCompetitionsPenaltiesQueue.process(async (job) => {
  const {
    Modalidade,
    Ano,
    Objeto,
    Processo,
    Termo_contratual,
    Situacao_da_licitacao,
    Valor_estimado,
  } = job.data;

  const contractExecutionsAndCompetitionsPenaltiesRepository =
    PrismaContractExecutionsAndCompetitionsPenaltiesRepository.getInstance();
  const createContractExecutionsAndCompetitionsPenaltiesUseCase =
    new CreateContractExecutionsAndCompetitionsPenaltiesUseCase(
      contractExecutionsAndCompetitionsPenaltiesRepository
    );

  try {
    const result =
      await createContractExecutionsAndCompetitionsPenaltiesUseCase.execute({
        modality: Modalidade,
        yearNumber: Ano,
        object: Objeto,
        originalProcessNumber: Processo,
        contractualTerm: Termo_contratual,
        biddingStatus: Situacao_da_licitacao,
        estimatedValue: Valor_estimado,
      });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log(
  "Bull - createContractExecutionsAndCompetitionsPenalties - Queue is running..."
);

export { createContractExecutionsAndCompetitionsPenaltiesQueue };
