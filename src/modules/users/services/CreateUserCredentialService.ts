import { ClientSession } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import UserCredential from '../schemas/UserCredential';

interface IRequestDTO {
    email: string;
    password: string;
    userId: string;
    session: ClientSession;
}

class CreateUserCredentialService {

    public async execute({ email, password, userId, session } : IRequestDTO): Promise<any>{
        console.log(userId);
        const user = await UserCredential.create([{ _id: uuidv4(), email, password, userId }], { session });
        
        return user[0];
    }
}

export default CreateUserCredentialService;