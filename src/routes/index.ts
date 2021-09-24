import { Router } from 'express';

const routes = Router();

routes.get('/hello', (request, response) => response.json({message: 'olá mundo'}));
routes.post('/hello', (request, response) => response.json({message: `olá ${request.body.name}`}));

export default routes;