import { v4 as uuidv4 } from 'uuid';

import Farm from '../schemas/Farm';

interface IRequestDTO {
    name: string;
    userId: string;
    street : String;
    district : String;
    city : String;
    state: String;
    cep : String;
    nirf : String;
    position : {
      lat : Number;
      long : Number;
      radius : Number;
    }
}

class CreateFarmService {

    public async execute({ name, userId, street, district, city, state, cep, nirf, position } : IRequestDTO): Promise<any>{
        console.log(name, userId)
        const farm = await Farm.create({ _id: uuidv4(), name, userId, street, district, city, state, cep, nirf, position});
        console.log(farm)
        
        return farm;
    }
}

export default CreateFarmService;