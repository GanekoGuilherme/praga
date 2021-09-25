import { Request, Response } from 'express';
import CreateFarmService from '../services/CreateFarmService';

class FarmController {

    public async store(request: Request, response: Response): Promise<Response> {
        const {name, userId, street, district, city, state, cep, nirf, position} = request.body;
        
        const createFarmService = new CreateFarmService();

        const farm = await createFarmService.execute({ name, userId, street, district, city, state, cep, nirf, position});
        
        return response.status(200).json({msg: `Fazenda ${farm.name} cadastrada com sucesso.`, farm : farm._id });
    }
}

export default FarmController;