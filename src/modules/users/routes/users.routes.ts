import { Router } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();

const usersRouter = Router();

usersRouter.post('/register', userController.store);

export default usersRouter;