import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

import 'express-async-errors';

import routes from './routes';
import HandleError from '@shared/errors/HandleError';

const app = express()

app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploads',express.static(path.join(__dirname, '..', 'uploads')));
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {   
    console.log(error);
    HandleError.handleError({ error, request, response });
})

app.listen(3000, () => console.log('Server is runnning on port 3000'));