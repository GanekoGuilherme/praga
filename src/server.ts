import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express()

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: 'Error',
        message: error.message
    })
})

app.listen(3000, () => console.log('Server is runnning on port 3000'));