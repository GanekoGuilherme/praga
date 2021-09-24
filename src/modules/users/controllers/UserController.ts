import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import CreateUserCredentialService from '../services/CreateUserCredentialService';

class UserController {

    public async store(request: Request, response: Response): Promise<Response> {
        const {email, password, taxId, name} = request.body;
        
        const createUserService = new CreateUserService();
        const createUserCredentialService = new CreateUserCredentialService();

        const user = await createUserService.execute({ taxId, name });
        const userCredential = await createUserCredentialService.execute({ password, email, userId: user._id });

        return response.status(200).json({msg: `usuário ${user.name} cadastrado com sucesso.`, userId: user._id });
    }
}

export default UserController;