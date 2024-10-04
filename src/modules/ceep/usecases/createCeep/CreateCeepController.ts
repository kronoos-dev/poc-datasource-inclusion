import { Request, Response } from "express";
import { CreateCeepUseCase } from "./CreateCeepUseCase";

class CreateCeepController {
  constructor(private createCeepUseCase: CreateCeepUseCase) {}

  async execute(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const {
        cnpj,
        corporateName,
        sanctionDescription,
        sanctionDate,
        leeniencyAgreement,
        disagreementDeal,
      } = request.body;

      const newCeep = await this.createCeepUseCase.execute({
        cnpj,
        corporateName,
        sanctionDescription,
        sanctionDate,
        leeniencyAgreement,
        disagreementDeal,
      });

      return response.status(201).json(newCeep);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { CreateCeepController };
