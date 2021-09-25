import { Router } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();

const usersRouter = Router();

usersRouter.post('/register', userController.store);

usersRouter.put('/update/user/:userId', userController.updateUser);

usersRouter.put('/update/credentials/:userId', userController.updateUserCredentials);

export default usersRouter;