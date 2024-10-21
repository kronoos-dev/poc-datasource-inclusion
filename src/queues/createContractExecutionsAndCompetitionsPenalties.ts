import { PrismaContractExecutionsAndCompetitionsPenaltiesRepository } from "@modules/ceep/repositories/implementations/PrismaContractExecutionsAndCompetitionsPenaltiesRepository";
import { CreateContractExecutionsAndCompetitionsPenaltiesUseCase } from "@modules/ceep/usecases/createContractExecutionsAndCompetitionsPenalties/CreateContractExecutionsAndCompetitionsPenaltiesUseCase";
import Bull from "bull";

const createContractExecutionsAndCompetitionsPenaltiesQueue = new Bull(
  "createContractExecutionsAndCompetitionsPenalties",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createContractExecutionsAndCompetitionsPenaltiesQueue.process(async (job) => {
  const {
    CPF_CNPJ,
    TIPO_PESSOA,
    TIPO_DEVEDOR,
    NOME_DEVEDOR,
    UF_UNIDADE_RESPONSAVEL,
    UNIDADE_RESPONSAVEL,
    ENTIDADE_RESPONSAVEL,
    UNIDADE_INSCRICAO,
    NUMERO_INSCRICAO,
    TIPO_SITUACAO_INSCRICAO,
    SITUACAO_INSCRICAO,
    RECEITA_PRINCIPAL,
    DATA_INSCRICAO,
    INDICADOR_AJUIZADO,
    VALOR_CONSOLIDADO,
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
        cpfCnpj: CPF_CNPJ,
        personType: TIPO_PESSOA,
        debtorType: TIPO_DEVEDOR,
        debtorName: NOME_DEVEDOR,
        responsibleUnitState: UF_UNIDADE_RESPONSAVEL,
        responsibleUnit: UNIDADE_RESPONSAVEL,
        responsibleEntity: ENTIDADE_RESPONSAVEL,
        registrationUnit: UNIDADE_INSCRICAO,
        registrationNumber: NUMERO_INSCRICAO,
        registrationSituationType: TIPO_SITUACAO_INSCRICAO,
        registrationSituation: SITUACAO_INSCRICAO,
        mainRevenue: RECEITA_PRINCIPAL,
        registrationDate: DATA_INSCRICAO,
        legalIndicator: INDICADOR_AJUIZADO,
        consolidatedValue: VALOR_CONSOLIDADO,
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
