import { PrismaTendersAndContractsRepository } from "@modules/ceep/repositories/implementations/PrismaTendersAndContractsRepository";
import { CreateTendersAndContractsUseCase } from "@modules/ceep/usecases/createTendersAndContracts/CreateTendersAndContractsUseCase";
import Bull from "bull";

const createTendersAndContractsQueue = new Bull(
  "createTendersAndContracts",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createTendersAndContractsQueue.process(async (job) => {
  const {
    Termo_contratual,
    Fornecedor,
    Objeto,
    Unidade_fiscalizadora,
    Data_de_assinatura,
    Inicio_da_vigencia,
    Vigente_ate,
    Prorrogavel,
    Vigencia_maxima,
    Valor_inicial,
    Valor_total_atualizado,
    Modalidade_de_licitacao,
    Numero_da_licitacao,
    Ano_da_licitacao,
    Processo_de_origem,
  } = job.data;

  const tendersAndContractsRepository =
    PrismaTendersAndContractsRepository.getInstance();
  const createTendersAndContractsUseCase = new CreateTendersAndContractsUseCase(
    tendersAndContractsRepository
  );

  try {
    const result = await createTendersAndContractsUseCase.execute({
      contractualTerm: Termo_contratual,
      supplier: Fornecedor,
      object: Objeto,
      supervisionUnits: Unidade_fiscalizadora,
      signatureDate: Data_de_assinatura,
      validityDateStart: Inicio_da_vigencia,
      validityDateEnd: Vigente_ate,
      extendable: Prorrogavel,
      maximumValidityDate: Vigencia_maxima,
      initialValue: Valor_inicial,
      updatedTotalValue: Valor_total_atualizado,
      biddingType: Modalidade_de_licitacao,
      biddingNumber: Numero_da_licitacao,
      biddingYear: Ano_da_licitacao,
      originProcess: Processo_de_origem,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createTendersAndContracts - Queue is running...");

export { createTendersAndContractsQueue };
