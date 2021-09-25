import { ClientSession } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import Plague from '../schemas/Plague';

interface IRequestDTO {
    name: string;
    photo: string;
    active: boolean;
    plagueId: string
}

class UpdatePlagueService {

    public async execute({ name, photo, active, plagueId } : IRequestDTO): Promise<any>{
        const plague = await Plague.updateOne({plagueId : plagueId}, {name, photo, active });
        
        return plague;
    }
}

export default UpdatePlagueService;