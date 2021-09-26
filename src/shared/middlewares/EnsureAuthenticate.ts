import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticate( request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({
            message: 'Token inválido.'
        });
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, 'c435b6e3-7327-4ffb-a05f-b831bb24f899');

        return next();
    } catch (err) {
        return response.status(401).json({
            message: 'Token inválido.'
        });
    }
};