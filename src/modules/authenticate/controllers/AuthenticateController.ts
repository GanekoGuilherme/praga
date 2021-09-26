import MaijetEmailProvider from '@shared/providers/email/implementations/MailjetEmailProvider';
import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuhenticateUserService';

class AuthenticateController {

    public async auth(request: Request, response: Response): Promise<Response> {
        const {email, password} = request.body;
        
        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({ email, password });

        return response.status(200).json(token);
    }

    public async resetPassword(request: Request, response: Response): Promise<Response>{
        const provider = new MaijetEmailProvider();
        provider.sendEmail();
        return response.status(200).json({ message: 'E-mail de recuperação de senha enviado com sucesso.' });
    }
}

export default AuthenticateController;