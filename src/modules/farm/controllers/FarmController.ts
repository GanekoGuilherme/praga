import { Request, Response } from 'express';
import CreateAddressService from '../services/CreateAddressService';
import CreateFarmService from '../services/CreateFarmService';

class FarmController {

    public async store(request: Request, response: Response): Promise<Response> {
        const {name, userId, street, district, city, state, cep, nirf, position} = request.body;
        
        const createFarmService = new CreateFarmService();
        const createAddressService = new CreateAddressService();

        const address = await createAddressService.execute({ street, district, name, city, state, cep, nirf, position});
        console.log("passou")
        const farm = await createFarmService.execute({ name, userId, addressId:address._id});
        console.log(farm)
        return response.status(200).json({msg: `Fazenda ${farm.name} cadastrada com sucesso.`, farm : farm._id });
    }
}

export default FarmController;