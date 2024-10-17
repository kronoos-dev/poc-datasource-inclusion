import { PrismaCelebratedDealsRepository } from "@modules/ceep/repositories/implementations/PrismaCelebratedDealsRepository";
import { CreateCelebratedDealsUseCase } from "@modules/ceep/usecases/createCelebratedDeals/CreateCelebratedDealsUseCase";
import Bull from "bull";

const createCelebratedDealsQueue = new Bull(
  "createCelebratedDeals",
  process.env.REDIS_URL || "redis://localhost:6379"
);

createCelebratedDealsQueue.process(async (job) => {
  const { year, companyName, agreedValue, attachments } = job.data;

  const celebratedDealsRepository =
    PrismaCelebratedDealsRepository.getInstance();
  const createCelebratedDealsUseCase = new CreateCelebratedDealsUseCase(
    celebratedDealsRepository
  );

  try {
    const result = await createCelebratedDealsUseCase.execute({
      year,
      companyName,
      agreedValue,
      attachments,
    });

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
  }
});

console.log("Bull - createCelebratedDeals - Queue is running...");

export { createCelebratedDealsQueue };
