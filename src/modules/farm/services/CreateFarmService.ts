import { v4 as uuidv4 } from 'uuid';

import Farm from '../schemas/Farm';

interface IRequestDTO {
    name: string;
    userId: string;
    addressId: string;
}

class CreateFarmService {

    public async execute({ name, userId, addressId } : IRequestDTO): Promise<any>{
        console.log(name, userId, addressId)
        const farm = await Farm.create({ _id: uuidv4(), name, userId, addressId});
        console.log(farm)
        
        return farm;
    }
}

export default CreateFarmService;