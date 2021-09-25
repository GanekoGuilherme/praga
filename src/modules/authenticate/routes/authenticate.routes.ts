import { Router } from "express";
import AuthenticateController from "../controllers/AuthenticateController";

const authenticateController = new AuthenticateController();

const authenticateRouter = Router();

authenticateRouter.post('/', authenticateController.auth);

export default authenticateRouter;