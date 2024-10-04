import { PrismaCeepRepository } from "../../repositories/implementations/PrismaCeepRepository";
import { CreateCeepController } from "./CreateCeepController";
import { CreateCeepUseCase } from "./CreateCeepUseCase";

const ceepRepository = PrismaCeepRepository.getInstance();
const createCeepUseCase = new CreateCeepUseCase(ceepRepository);
const createCeepController = new CreateCeepController(createCeepUseCase);

export { createCeepController };
