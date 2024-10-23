import { PrismaFgtsDebtRepository } from "@modules/ceep/repositories/implementations/PrismaFgtsDebtRepository";
import { CreateFgtsDebtUseCase } from "@modules/ceep/usecases/createFgtsDebt/CreateFgtsDebtUseCase";
import Bull from "bull";

const createFgtsDebtQueue = new Bull(
  "createFgtsDebt",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createFgtsDebtQueue.process(async (job) => {
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

  const fgtsDebtRepository = PrismaFgtsDebtRepository.getInstance();
  const createFgtsDebtUseCase = new CreateFgtsDebtUseCase(fgtsDebtRepository);

  try {
    const result = await createFgtsDebtUseCase.execute({
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
      indicatorJudged: INDICADOR_AJUIZADO,
      consolidatedValue: VALOR_CONSOLIDADO,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createFgtsDebt - Queue is running...");

export { createFgtsDebtQueue };
