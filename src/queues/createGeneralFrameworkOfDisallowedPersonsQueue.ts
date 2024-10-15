import { PrismaGeneralFrameworkOfDisallowedPersonsRepository } from "@modules/ceep/repositories/implementations/PrismaGeneralFrameworkOfDisallowedPersonsRepository";
import { CreateCVMGeneralFrameworkOfDisallowedPersonsUseCase } from "@modules/ceep/usecases/createGeneralFrameworkOfDisallowedPersons/CreateCVMGeneralFrameworkOfDisallowedPersonsUseCase";
import Bull from "bull";

const createGeneralFrameworkOfDisallowedPersonsQueue = new Bull(
  "createGeneralFrameworkOfDisallowedPersonsQueue",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createGeneralFrameworkOfDisallowedPersonsQueue.process(async (job) => {
  const {
    pas,
    name,
    cpf,
    penalty,
    termInYears,
    startOfPenaltyTerm,
    endOfPenaltyTerm,
  } = job.data;

  const generalFrameworkOfDisallowedPersonsRepository =
    PrismaGeneralFrameworkOfDisallowedPersonsRepository.getInstance();
  const createCVMGeneralFrameworkOfDisallowedPersonsUseCase =
    new CreateCVMGeneralFrameworkOfDisallowedPersonsUseCase(
      generalFrameworkOfDisallowedPersonsRepository
    );

  try {
    const result =
      await createCVMGeneralFrameworkOfDisallowedPersonsUseCase.execute({
        pas,
        name,
        cpf,
        penalty,
        termInYears,
        startOfPenaltyTerm,
        endOfPenaltyTerm,
      });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log(
  "Bull - reateGeneralFrameworkOfDisallowedPersons - Queue is running..."
);

export { createGeneralFrameworkOfDisallowedPersonsQueue };
