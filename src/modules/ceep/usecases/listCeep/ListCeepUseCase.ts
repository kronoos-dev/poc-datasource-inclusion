import { ICeepsRepository } from "@modules/ceep/repositories/ICeepRepository";

class ListCeepUseCase {
  constructor(private ceepsRepository: ICeepsRepository) {}

  execute() {
    const ceepsList = this.ceepsRepository.find();

    return ceepsList;
  }
}

export { ListCeepUseCase };
