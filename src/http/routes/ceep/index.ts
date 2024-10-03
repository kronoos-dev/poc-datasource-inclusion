import { Request, Response, Router } from "express";
// TODO, resolver paths
import { createCeepController } from "../../../modules/ceep/usecases/createCeep";

const ceepRoutes = Router();

ceepRoutes.use('/ceeps')

ceepRoutes.post('/', (request: Request, response: Response) => {
  createCeepController.execute(request, response)
}
  
);

export { ceepRoutes };

