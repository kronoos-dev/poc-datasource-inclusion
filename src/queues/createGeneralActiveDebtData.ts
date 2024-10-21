import { PrismaGeneralActiveDebtRepository } from "@modules/ceep/repositories/implementations/PrismaGeneralActiveDebtRepository";
import { CreateGeneralActiveDebtUseCase } from "@modules/ceep/usecases/createGeneralActiveDebt/CreateGeneralActiveDebtUseCase";
import Bull from "bull";

const createGeneralActiveDebtDataQueue = new Bull(
  "createGeneralActiveDebtData",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createGeneralActiveDebtDataQueue.process(async (job) => {
  const {
    CPF_CNPJ,
    TIPO_PESSOA,
    TIPO_DEVEDOR,
    NOME_DEVEDOR,
    UF_DEVEDOR,
    UNIDADE_RESPONSAVEL,
    NUMERO_INSCRICAO,
    TIPO_SITUACAO_INSCRICAO,
    SITUACAO_INSCRICAO,
    RECEITA_PRINCIPAL,
    DATA_INSCRICAO,
    INDICADOR_AJUIZADO,
    VALOR_CONSOLIDADO,
  } = job.data;

  const generalActiveDebtRepository =
    PrismaGeneralActiveDebtRepository.getInstance();
  const createGeneralActiveDebtUseCase = new CreateGeneralActiveDebtUseCase(
    generalActiveDebtRepository
  );

  try {
    const result = await createGeneralActiveDebtUseCase.execute({
      cpfCnpj: CPF_CNPJ,
      personType: TIPO_PESSOA,
      debtorType: TIPO_DEVEDOR,
      debtorName: NOME_DEVEDOR,
      debtorState: UF_DEVEDOR,
      responsibleUnit: UNIDADE_RESPONSAVEL,
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

console.log("Bull - createGeneralActiveDebtData - Queue is running...");

export { createGeneralActiveDebtDataQueue };
