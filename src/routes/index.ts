import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import plagueRouter from '@modules/plague/routes/plague.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/plague', plagueRouter);


export default routes;