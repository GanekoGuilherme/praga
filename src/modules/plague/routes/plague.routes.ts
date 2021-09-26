import { ensureAuthenticate } from "@shared/middlewares/EnsureAuthenticate";
import { Router } from "express";
import multer from 'multer';

import uploadConfig from '@config/upload';
import PlagueController from "../controllers/PlagueController";

const plagueController = new PlagueController();

const plagueRouter = Router();
const upload = multer(uploadConfig);

plagueRouter.post('/register', ensureAuthenticate, upload.array('images'), plagueController.store);

plagueRouter.get('/list', plagueController.list);

plagueRouter.post('/list', ensureAuthenticate, plagueController.listWithFilter);

plagueRouter.get('/list/:state', ensureAuthenticate, plagueController.listByState);

plagueRouter.post('/list/:state', ensureAuthenticate, plagueController.listByStateWithFilter);

plagueRouter.put('/update/:plagueId', ensureAuthenticate, plagueController.update);

plagueRouter.get('/notification/:userId', ensureAuthenticate, plagueController.getNotification);

plagueRouter.get('/frontList', plagueController.frontList);

plagueRouter.delete('/notification/:notificationId', ensureAuthenticate, plagueController.deleteNotification);

plagueRouter.get('/listPlagues', plagueController.listPlagues);

export default plagueRouter;