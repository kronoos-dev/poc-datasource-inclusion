import { PrismaContractualTermsRepository } from "@modules/ceep/repositories/implementations/PrismaContractualTermsRepository";
import { CreateContractualTermsUseCase } from "@modules/ceep/usecases/createContractualTerms/CreateContractualTermsUseCase";
import Bull from "bull";

const createContractualTermsQueue = new Bull(
  "createContractualTerms",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createContractualTermsQueue.process(async (job) => {
  const {
    TERMO_CONTRATUAL,
    FORNECEDOR,
    DESCR_OBJETO,
    UNIDADES_FISCALIZADORAS,
    DATA_ASSINATURA,
    DATA_VIGENCIA_INICIO,
    DATA_VIGENCIA_TERMINO,
    Prorrogavel,
    DATA_VIGENCIA_MAXIMA,
    VALOR_INICIAL,
    VALOR_TOTAL_ATUALIZADO,
    DESCR_MODALIDADE_LICITACAO,
    NUM_LICITACAO,
    ANO_LICITACAO,
    PROCESSO_CRIACAO,
  } = job.data;

  const contractualTermsRepository =
    PrismaContractualTermsRepository.getInstance();
  const createContractualTermsUseCase = new CreateContractualTermsUseCase(
    contractualTermsRepository
  );

  try {
    const result = await createContractualTermsUseCase.execute({
      contractualTerm: TERMO_CONTRATUAL,
      supplier: FORNECEDOR,
      object: DESCR_OBJETO,
      supervisionUnits: UNIDADES_FISCALIZADORAS,
      signatureDate: DATA_ASSINATURA,
      validityDateStart: DATA_VIGENCIA_INICIO,
      validityDateEnd: DATA_VIGENCIA_TERMINO,
      extendable: Prorrogavel,
      maximumValidityDate: DATA_VIGENCIA_MAXIMA,
      initialValue: VALOR_INICIAL,
      updatedTotalValue: VALOR_TOTAL_ATUALIZADO,
      biddingType: DESCR_MODALIDADE_LICITACAO,
      biddingNumber: NUM_LICITACAO,
      biddingYear: ANO_LICITACAO,
      originProcess: PROCESSO_CRIACAO,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createContractualTerms - Queue is running...");

export { createContractualTermsQueue };
