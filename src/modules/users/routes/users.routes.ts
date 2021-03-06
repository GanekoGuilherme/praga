import { ensureAuthenticate } from "@shared/middlewares/EnsureAuthenticate";
import { Router } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();

const usersRouter = Router();

usersRouter.post('/register', userController.store);

usersRouter.put('/update/:userId', ensureAuthenticate, userController.updateUser);

usersRouter.put('/update/credentials/:userId', ensureAuthenticate, userController.updateUserCredentials);

export default usersRouter;