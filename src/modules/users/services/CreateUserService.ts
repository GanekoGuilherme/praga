import { ClientSession } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import User from '../schemas/User';

interface IRequestDTO {
    name: string;
    taxId: string;
    session: ClientSession;
}

class CreateUserService {

    public async execute({ name, taxId, session } : IRequestDTO): Promise<any>{
        const user = await User.create([{ _id: uuidv4(), name, taxId }], { session });

        return user[0];
    }
}

export default CreateUserService;