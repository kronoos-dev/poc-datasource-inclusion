import { PrismaSanctionedCompaniesRepository } from "@modules/ceep/repositories/implementations/PrismaSanctionedCompaniesRepository";
import { CreateSanctionedCompaniesUseCase } from "@modules/ceep/usecases/createSanctionedCompanies/CreateSanctionedCompaniesUseCase";
import Bull from "bull";

const createSanctionedCompaniesQueue = new Bull(
  "createSanctionedCompanies",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createSanctionedCompaniesQueue.process(async (job) => {
  const {
    NUMERO_PROCESSO,
    RAZ_SOCIAL,
    NUM_CNPJ,
    NUMERO_CONTRATO,
    OBJETO,
    TIPO_SANCAO,
    DETALHE_SANCAO,
    VALOR_MULTA,
    VALOR_DEBITO,
    FUNDAMENTO_LEGAL,
    DT_REGISTRO_SICAF,
  } = job.data;

  const sanctionedCompaniesRepository =
    PrismaSanctionedCompaniesRepository.getInstance();
  const createSanctionedCompaniesUseCase = new CreateSanctionedCompaniesUseCase(
    sanctionedCompaniesRepository
  );

  try {
    const result = await createSanctionedCompaniesUseCase.execute({
      processNumber: NUMERO_PROCESSO,
      company: RAZ_SOCIAL,
      cnpj: NUM_CNPJ,
      contractNumber: NUMERO_CONTRATO,
      object: OBJETO,
      sanctionType: TIPO_SANCAO,
      sanctionDetail: DETALHE_SANCAO,
      fineValue: VALOR_MULTA,
      debitValue: VALOR_DEBITO,
      legalFundament: FUNDAMENTO_LEGAL,
      sicafRegistrationDate: DT_REGISTRO_SICAF,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createSanctionedCompanies - Queue is running...");

export { createSanctionedCompaniesQueue };
