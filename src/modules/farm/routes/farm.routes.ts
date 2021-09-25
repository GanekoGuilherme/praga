import { Router } from "express";
import FarmController from "../controllers/FarmController";

const farmController = new FarmController();

const farmRouter = Router();

farmRouter.post('/register', farmController.store);
farmRouter.put('/update/:farmId', farmController.update);

export default farmRouter;