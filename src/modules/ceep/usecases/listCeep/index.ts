import { PrismaCeepRepository } from "../../repositories/implementations/PrismaCeepRepository";
import { ListCeepController } from "./ListCeepController";
import { ListCeepUseCase } from "./ListCeepUseCase";

const ceepRepository = PrismaCeepRepository.getInstance();
const listCeepUseCase = new ListCeepUseCase(ceepRepository);
const listCeepController = new ListCeepController(listCeepUseCase);

export { listCeepController };
