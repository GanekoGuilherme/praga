import { v4 as uuidv4 } from 'uuid';

import Address from '../schemas/Address';

interface IRequestDTO {
    street : String;
    district : String;
    name : String;
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

class CreateAddressService {

    public async execute({ street, district, name, city, state, cep, nirf, position } : IRequestDTO): Promise<any>{
        const address = await Address.create({ _id: uuidv4(), street, district, name, city, state, cep, nirf, position});
        console.log(address)
        return address;
    }
}

export default CreateAddressService;