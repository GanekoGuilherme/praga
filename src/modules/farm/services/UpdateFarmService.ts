import Farm from '../schemas/Farm';

interface IRequestDTO {
    name: string;
    street : string;
    district : string;
    city : string;
    state: string;
    cep : string;
    nirf : string;
    position : {
      lat : Number;
      long : Number;
      radius : Number;
    },
    farmId: string
}

class UpdateFarmService {

    public async execute({ name, street, district, city, state, cep, nirf, position, farmId } : IRequestDTO): Promise<any>{
        const farm = await Farm.updateOne({farmId : farmId},{name, street, district, city, state, cep, nirf, position});
        console.log(farm)
        
        return farm;
    }
}

export default UpdateFarmService;