import { PrismaCeepRepository } from '@modules/ceep/repositories/implementations/PrismaCeepRepository';
import { CreateCeepUseCase } from '@modules/ceep/usecases/createCeep/CreateCeepUseCase';
import Bull from 'bull';

// Create a new queue (example queue for 'createCeep')
const createCeepQueue = new Bull('createCeep', process.env.REDIS_URL || 'redis://localhost:6379');

createCeepQueue.process(async (job) => {
  const {
    cnpj,
    corporateName,
    sanctionDescription,
    sanctionDate,
    leeniencyAgreement,
    disagreementDeal,
    link
  } = job.data

  const ceepRepository = PrismaCeepRepository.getInstance();
  const createCeepUseCase = new CreateCeepUseCase(ceepRepository);
  
  try {
    const result = await createCeepUseCase.execute({
      cnpj,
      corporateName,
      sanctionDescription,
      sanctionDate,
      leeniencyAgreement,
      disagreementDeal,
      link
    })

    console.table(result)

    return result
  } catch (error) {
    console.error(error) 
  }
});

console.log('Bull - createCeep - Queue is running...');

export { createCeepQueue };
