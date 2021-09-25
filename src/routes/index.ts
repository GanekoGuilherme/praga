import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import plagueRouter from '@modules/plague/routes/plague.routes';
import farmRouter from '@modules/farm/routes/farm.routes';
import authenticateRouter from '@modules/authenticate/routes/authenticate.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/plague', plagueRouter);

routes.use("/farm", farmRouter);

routes.use("/authenticate", authenticateRouter);


export default routes;