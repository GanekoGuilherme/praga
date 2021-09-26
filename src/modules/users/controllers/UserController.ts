import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import CreateUserCredentialService from '../services/CreateUserCredentialService';
import AuthenticateUserService from '@modules/authenticate/services/AuhenticateUserService';
import mongoose from '@shared/database';
import UpdateUserService from '../services/UpdateUserService';
import UpdateUserCredentialsService from '../services/UpdateUserCredentialsService';

class UserController {

    public async store(request: Request, response: Response): Promise<Response> {
        const {email, password, taxId, name} = request.body;
        
        const createUserService = new CreateUserService();
        const createUserCredentialService = new CreateUserCredentialService();
        const authenticateUserService = new AuthenticateUserService();

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const user = await createUserService.execute({ taxId, name, session });
            await createUserCredentialService.execute({ password, email, userId: user._id, session });
            await session.commitTransaction();
            
            const { token } = await authenticateUserService.execute({ email, password });
                        
            return response.status(200).json({ token, userId: user._id, name: user.name });
        } catch(error){
            await session.abortTransaction();
            return response.status(500).json({msg: 'Falha no cadastro do usuário.'});
        } finally {
            session.endSession();
        }
    }

    public async updateUser(request: Request, response: Response): Promise<Response> {
        const{taxId, name} = request.body;
        const{userId} = request.params;
        const updateUserService = new UpdateUserService();
        await updateUserService.execute({name, taxId, userId});
        return response.status(200).json({msg: `Usuário atualizado com sucesso.`})
    }

    public async updateUserCredentials(request: Request, response: Response): Promise<Response> {
        const{password, email} = request.body;
        const{userId} = request.params;
        console.log(userId)
        const updateUserCredentialsService = new UpdateUserCredentialsService();
        await updateUserCredentialsService.execute({password, email, userId});
        return response.status(200).json({msg: `Usuário atualizado com sucesso.`})
    }
    
}

export default UserController;