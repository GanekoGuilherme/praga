import MaijetEmailProvider from '@shared/providers/email/implementations/MailjetEmailProvider';
import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuhenticateUserService';
import UserCredential from '@modules/users/schemas/UserCredential';
import User from '@modules/users/schemas/User';
import ResetPasswordService from '../services/ResetPasswordService';


class AuthenticateController {

    public async auth(request: Request, response: Response): Promise<Response> {
        const {email, password} = request.body;
        
        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({ email, password });

        return response.status(200).json(token);
    }

    public async resetPassword(request: Request, response: Response): Promise<Response>{
        //fazer a consulta para achar o nome do sujeito de acordo com o email do sujeito
        const{email} = request.body;
        
        const userId = await UserCredential.findOne({email}).select('userId ');
        
        const name = await User.findOne({userId}).select('name')
        
        const provider = new MaijetEmailProvider();
        
        const resetPasswordService = new ResetPasswordService(); 

        const token = await resetPasswordService.execute({userCredentialsId:userId._id});
        
        await provider.sendEmail(email, name, token);
        
        return response.status(200).json({ message: 'E-mail de recuperação de senha enviado com sucesso.' });
    }
}

export default AuthenticateController;