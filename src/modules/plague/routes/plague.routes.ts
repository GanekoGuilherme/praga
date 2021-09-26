import { ensureAuthenticate } from "@shared/middlewares/EnsureAuthenticate";
import { Router } from "express";
import PlagueController from "../controllers/PlagueController";

const plagueController = new PlagueController();

const plagueRouter = Router();

plagueRouter.post('/register', ensureAuthenticate, plagueController.store);

plagueRouter.get('/list', plagueController.list);

plagueRouter.post('/list', ensureAuthenticate, plagueController.listWithFilter);

plagueRouter.get('/list/:state', ensureAuthenticate, plagueController.listByState);

plagueRouter.post('/list/:state', ensureAuthenticate, plagueController.listByStateWithFilter);

plagueRouter.put('/update/:plagueId', ensureAuthenticate, plagueController.update);

plagueRouter.get('/notification/:userId', ensureAuthenticate, plagueController.getNotification);

export default plagueRouter;