import { PrismaSocialSecurityRepository } from "@modules/ceep/repositories/implementations/PrismaSocialSecurityRepository";
import { CreateSocialSecurityUseCase } from "@modules/ceep/usecases/createSocialSecurity/CreateSocialSecurityUseCase";
import Bull from "bull";

const createSocialSecurityDataQueue = new Bull(
  "createSocialSecurityData",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createSocialSecurityDataQueue.process(async (job) => {
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
    TIPO_CREDITO,
    DATA_INSCRICAO,
    INDICADOR_AJUIZADO,
    VALOR_CONSOLIDADO,
  } = job.data;

  const socialSecurityRepository = PrismaSocialSecurityRepository.getInstance();
  const createSocialSecurityUseCase = new CreateSocialSecurityUseCase(
    socialSecurityRepository
  );

  try {
    const result = await createSocialSecurityUseCase.execute({
      cpfCnpj: CPF_CNPJ,
      personType: TIPO_PESSOA,
      debtorType: TIPO_DEVEDOR,
      debtorName: NOME_DEVEDOR,
      debtorState: UF_DEVEDOR,
      responsibleUnit: UNIDADE_RESPONSAVEL,
      registrationNumber: NUMERO_INSCRICAO,
      registrationSituationType: TIPO_SITUACAO_INSCRICAO,
      registrationSituation: SITUACAO_INSCRICAO,
      creditType: TIPO_CREDITO,
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

console.log("Bull - createSocialSecurityData - Queue is running...");

export { createSocialSecurityDataQueue };
