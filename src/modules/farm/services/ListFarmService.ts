import Farm from '../schemas/Farm';

interface IRequestDTO {
    userId: string;    
}

class ListFarmService {

    public async execute({ userId } : IRequestDTO): Promise<any>{
        const listFarm = await Farm.find({ userId }).select('-createdAt -updatedAt');
        
        return listFarm;
    }
}

export default ListFarmService;