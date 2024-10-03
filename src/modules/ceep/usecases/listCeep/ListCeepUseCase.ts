// TODO, resolver paths
import { ICeepsRepository } from "../../repositories/ICeepRepository";

class ListCeepUseCase {
  constructor(private ceepsRepository: ICeepsRepository) {}

  execute() {
    const ceepsList = this.ceepsRepository.find();

    return ceepsList
  }  
}

export { ListCeepUseCase };
