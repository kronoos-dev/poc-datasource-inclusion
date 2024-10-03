import { Router } from "express";
import { ceepRoutes } from "./ceep";

const mainRoutes = Router();

mainRoutes.use('/ceeps', ceepRoutes)

export { mainRoutes };
