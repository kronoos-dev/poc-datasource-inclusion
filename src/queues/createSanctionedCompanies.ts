import { PrismaSanctionedCompaniesRepository } from "@modules/ceep/repositories/implementations/PrismaSanctionedCompaniesRepository";
import { CreateSanctionedCompaniesUseCase } from "@modules/ceep/usecases/createSanctionedCompanies/CreateSanctionedCompaniesUseCase";
import Bull from "bull";

const createSanctionedCompaniesQueue = new Bull(
  "createSanctionedCompanies",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createSanctionedCompaniesQueue.process(async (job) => {
  const {
    N_do_Processo,
    Empresa,
    CNPJ,
    Numero_do_contrato,
    Objeto,
    Tipo_da_sancao,
    Detalhe_da_sancao,
    Valor_da_multa,
    Valor_do_debito,
    Fundamento_legal,
    Data_de_registro,
    Data_de_inicio,
    Data_de_termino,
  } = job.data;

  const sanctionedCompaniesRepository =
    PrismaSanctionedCompaniesRepository.getInstance();
  const createSanctionedCompaniesUseCase = new CreateSanctionedCompaniesUseCase(
    sanctionedCompaniesRepository
  );

  try {
    const result = await createSanctionedCompaniesUseCase.execute({
      processNumber: N_do_Processo,
      company: Empresa,
      cnpj: CNPJ,
      contractNumber: Numero_do_contrato,
      object: Objeto,
      sanctionType: Tipo_da_sancao,
      sanctionDetail: Detalhe_da_sancao,
      fineValue: Valor_da_multa,
      debitValue: Valor_do_debito,
      legalFundament: Fundamento_legal,
      sicafRegistrationDate: Data_de_registro,
      sanctionStartDate: Data_de_inicio,
      sanctionEndDate: Data_de_termino,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createSanctionedCompanies - Queue is running...");

export { createSanctionedCompaniesQueue };
