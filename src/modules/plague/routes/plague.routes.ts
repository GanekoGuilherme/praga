import { Router } from "express";
import PlagueController from "../controllers/PlagueController";

const plagueController = new PlagueController();

const plagueRouter = Router();

plagueRouter.post('/register', plagueController.store);
plagueRouter.get('/list', plagueController.list);
plagueRouter.get('/list/:state', plagueController.listByState);
plagueRouter.put('/update/:plagueId', plagueController.update);
plagueRouter.get('/notification/:userId', plagueController.getNotification);

export default plagueRouter;