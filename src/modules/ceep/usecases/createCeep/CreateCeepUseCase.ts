import { Prisma } from "@prisma/client";
// TODO, resolver paths
import { ICeepsRepository } from "../../repositories/ICeepRepository";

class CreateCeepUseCase {
  constructor(private ceepsRepository: ICeepsRepository) {}

  execute( data: Prisma.ceep_datasourceCreateInput) {
    const ceep = this.ceepsRepository.create(data);

    return ceep
  }  
}

export { CreateCeepUseCase };
