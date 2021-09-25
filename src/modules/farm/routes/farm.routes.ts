import { Router } from "express";
import FarmController from "../controllers/FarmController";

const farmController = new FarmController();

const farmRouter = Router();

farmRouter.post('/register', farmController.store);

export default farmRouter;