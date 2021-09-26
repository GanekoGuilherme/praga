import { ensureAuthenticate } from "@shared/middlewares/EnsureAuthenticate";
import { Router } from "express";
import FarmController from "../controllers/FarmController";

const farmController = new FarmController();

const farmRouter = Router();

farmRouter.post('/register', ensureAuthenticate, farmController.store);
farmRouter.put('/update/:farmId', ensureAuthenticate, farmController.update);
farmRouter.get('/list/:userId',ensureAuthenticate, farmController.list);

export default farmRouter;