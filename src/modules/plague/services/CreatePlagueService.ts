import { v4 as uuidv4 } from 'uuid';

import Plague from '../schemas/Plague';

interface IRequestDTO {
    name: string;
    active: boolean;
    farmId: string;
    photo: string;
}

class CreatePlaguelService {

    public async execute({ name, photo, active, farmId } : IRequestDTO): Promise<any>{
        const plague = await Plague.create({ _id: uuidv4(), name, photo, active, farmId});
        
        return plague;
    }
}

export default CreatePlaguelService;