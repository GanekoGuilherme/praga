import MaijetEmailProvider from '@shared/providers/email/implementations/MailjetEmailProvider';
import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuhenticateUserService';
import UserCredential from '@modules/users/schemas/UserCredential';
import User from '@modules/users/schemas/User';
import CreatePasswordTokenService from '../services/CreatePasswordTokenService';
import RegisterPasswordService from '../services/RegisterPasswordService';


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
        console.log(userId)
        const name = await User.findOne({_id:userId.userId}).select('name')
        console.log(name)
        const provider = new MaijetEmailProvider();
        
        const createPasswordTokenService = new CreatePasswordTokenService(); 

        const token = await createPasswordTokenService.execute({userCredentialsId:userId._id});
        
        await provider.sendEmail(email, name, token);
        
        return response.status(200).json({ message: 'E-mail de recuperação de senha enviado com sucesso.' });
    }

    public async registerPassword(request: Request, response: Response): Promise<Response> {
        const {password} = request.body;
        const {tokenURL} = request.params;
        
        const registerPasswordService = new RegisterPasswordService();
        const email = await registerPasswordService.execute({tokenURL, password}); 

        return response.status(200).json(email);
    }
}

export default AuthenticateController;