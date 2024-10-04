import { Request, Response, Router } from "express";

import { createCeepController } from "@modules/ceep/usecases/createCeep";
import { listCeepController } from "@modules/ceep/usecases/listCeep";

const ceepRoutes = Router();

ceepRoutes.get('/', (request: Request, response: Response) => {
  listCeepController.execute(request, response)
});

ceepRoutes.post('/', (request: Request, response: Response) => {
  createCeepController.execute(request, response)
});

export { ceepRoutes };

