import { Request, Response } from "express";
// TODO, repolver paths
import { getDateTimeFromString } from "../../../../utils/dateParse";
import { CreateCeepUseCase } from "./createCeepUseCase";

class CreateCeepController {
  constructor(private createCeepUseCase: CreateCeepUseCase) {}

  execute(request: Request, response: Response): Response {
    try {
      const {
        cnpj,
        corporateName,
        sanctionDescription,
        sanctionDate,
        leeniencyAgreement,
        disagreementDeal
      } = request.body;

      const newCeep = this.createCeepUseCase.execute({
        cnpj,
        corporateName,
        sanctionDescription,
        sanctionDate: getDateTimeFromString(sanctionDate),
        leeniencyAgreement,
        disagreementDeal
      })
      
      return response.status(201).json(newCeep);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { CreateCeepController };
