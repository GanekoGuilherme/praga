import { v4 as uuidv4 } from 'uuid';

import User from '../schemas/User';

interface IRequestDTO {
    name: string;
    taxId: string;
}

class CreateUserService {

    public async execute({ name, taxId } : IRequestDTO): Promise<any>{
        const user = await User.create({ _id: uuidv4(), name, taxId });

        return user;
    }
}

export default CreateUserService;