import { Router } from "express";
import AuthenticateController from "../controllers/AuthenticateController";

const authenticateController = new AuthenticateController();

const authenticateRouter = Router();

authenticateRouter.post('/', authenticateController.auth);

authenticateRouter.post('/resetPassword', authenticateController.resetPassword);

authenticateRouter.post('/registerPassword/:tokenURL', authenticateController.registerPassword);

export default authenticateRouter;