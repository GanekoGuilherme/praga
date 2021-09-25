import { Request, Response } from 'express';
import CreateFarmService from '../services/CreateFarmService';
import ListFarmService from '../services/ListFarmService';
import UpdateFarmService from '../services/UpdateFarmService';

class FarmController {

    public async store(request: Request, response: Response): Promise<Response> {
        const {name, userId, street, district, city, state, cep, nirf, position} = request.body;
        
        const createFarmService = new CreateFarmService();

        const farm = await createFarmService.execute({ name, userId, street, district, city, state, cep, nirf, position});
        
        return response.status(200).json({msg: `Fazenda ${farm.name} cadastrada com sucesso.`, farm : farm._id });
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const {userId} = request.params;
        
        const listFarmService = new ListFarmService();

        const listFarm = await listFarmService.execute({ userId });
        
        return response.status(200).json({items: listFarm });
    }
    
    public async update(request: Request, response: Response): Promise<Response> {
        const {name, street, district, city, state, cep, nirf, position} = request.body;
        const {farmId} = request.params
        
        const updateFarmService = new UpdateFarmService();

        const farm = await updateFarmService.execute({ name, street, district, city, state, cep, nirf, position, farmId});
        
        return response.status(200).json({msg: `Fazenda atualizada com sucesso.` });
    }
}


export default FarmController;