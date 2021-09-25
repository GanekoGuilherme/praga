import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import CreateUserCredentialService from '../services/CreateUserCredentialService';
import AuthenticateUserService from '@modules/authenticate/services/AuhenticateUserService';
import mongoose from '@shared/database';

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
            
            const token = await authenticateUserService.execute({ email, password });
                        
            return response.status(200).json(token);
        } catch(error){
            await session.abortTransaction();
            return response.status(500).json({msg: 'Falha no cadastro do usuário.'});
        } finally {
            session.endSession();
        }
    }
}

export default UserController;