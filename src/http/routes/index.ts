import { Router } from "express";
import { ceepRoutes } from "./ceep";

const mainRoutes = Router();

mainRoutes.use(ceepRoutes)

export { mainRoutes };
