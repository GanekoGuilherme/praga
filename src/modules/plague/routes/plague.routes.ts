import { Router } from "express";
import PlagueController from "../controllers/PlagueController";

const plagueController = new PlagueController();

const plagueRouter = Router();

plagueRouter.post('/register', plagueController.store);

export default plagueRouter;