import { v4 as uuidv4 } from 'uuid';

import UserCredential from '../schemas/UserCredential';

interface IRequestDTO {
    email: string;
    password: string;
    userId: string;
}

class CreateUserCredentialService {

    public async execute({ email, password, userId } : IRequestDTO): Promise<any>{
        const user = await UserCredential.create({ _id: uuidv4(), email, password, userId});
        
        return user;
    }
}

export default CreateUserCredentialService;