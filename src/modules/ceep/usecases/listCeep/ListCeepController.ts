import { Request, Response } from "express";
// TODO, repolver paths
import { ListCeepUseCase } from "./ListCeepUseCase";

class ListCeepController {
  constructor(private listCeepUseCase: ListCeepUseCase) {}

  async execute(_: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const ceepList = await this.listCeepUseCase.execute()
      
      return response.status(200).json(ceepList);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { ListCeepController };
