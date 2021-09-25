import { Request, Response } from 'express';
import CreatePlagueService from '../services/CreatePlagueService';

class PlagueController {

    public async store(request: Request, response: Response): Promise<Response> {
        const {name, photo, active, farmId} = request.body;
        
        const createPlagueService = new CreatePlagueService();

        const plague = await createPlagueService.execute({ name, photo, active, farmId});

        return response.status(200).json({msg: `praga ${plague.name} cadastrada com sucesso.`, plague : plague._id });
    }
}

export default PlagueController;