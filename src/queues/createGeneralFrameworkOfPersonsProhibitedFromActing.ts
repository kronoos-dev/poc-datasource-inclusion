import { PrismaGeneralFrameworkOfDisallowedPersonsRepository } from "@modules/ceep/repositories/implementations/PrismaGeneralFrameworkOfDisallowedPersonsRepository";
import { PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository } from "@modules/ceep/repositories/implementations/PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository";
import { CreateCVMGeneralFrameworkOfDisallowedPersonsUseCase } from "@modules/ceep/usecases/createGeneralFrameworkOfDisallowedPersons/CreateCVMGeneralFrameworkOfDisallowedPersonsUseCase";
import { CreateCVMGeneralFrameworkOfPersonsProhibitedFromActingUseCase } from "@modules/ceep/usecases/createGeneralFrameworkOfPersonsProhibitedFromActing/CreateGeneralFrameworkOfPersonsProhibitedFromActingUseCase";
import Bull from "bull";

const createGeneralFrameworkOfPersonsProhibitedFromActingQueue = new Bull(
  "createGeneralFrameworkOfPersonsProhibitedFromActingQueue",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createGeneralFrameworkOfPersonsProhibitedFromActingQueue.process(
  async (job) => {
    const {
      pas,
      name,
      cpfCnpj,
      penalty,
      termInYears,
      startOfPenaltyTerm,
      endOfPenaltyTerm,
    } = job.data;

    const generalFrameworkOfPersonsProhibitedFromActingRepository =
      PrismaGeneralFrameworkOfPersonsProhibitedFromActingRepository.getInstance();
    const createCVMGeneralFrameworkOfPersonsProhibitedFromActingUseCase =
      new CreateCVMGeneralFrameworkOfPersonsProhibitedFromActingUseCase(
        generalFrameworkOfPersonsProhibitedFromActingRepository
      );

    try {
      const result =
        await createCVMGeneralFrameworkOfPersonsProhibitedFromActingUseCase.execute(
          {
            pas,
            name,
            cpfCnpj,
            penalty,
            termInYears,
            startOfPenaltyTerm,
            endOfPenaltyTerm,
          }
        );

      console.table(result);

      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

console.log(
  "Bull - createGeneralFrameworkOfPersonsProhibitedFromActingQueue - Queue is running..."
);

export { createGeneralFrameworkOfPersonsProhibitedFromActingQueue };
