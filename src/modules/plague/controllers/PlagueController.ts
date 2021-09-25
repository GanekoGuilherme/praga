import { Request, Response } from 'express';
import CreatePlagueService from '../services/CreatePlagueService';
import ListPlagueService from '../services/ListPlagueService';
import ListPlagueStateService from '../services/ListPlagueStateService';

class PlagueController {

    public async store(request: Request, response: Response): Promise<Response> {
        const {name, photo, active, farmId} = request.body;
        
        const createPlagueService = new CreatePlagueService();

        const plague = await createPlagueService.execute({ name, photo, active, farmId});

        return response.status(200).json({msg: `praga ${plague.name} cadastrada com sucesso.`, plague : plague._id });
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listPlagueService = new ListPlagueService();

        const listPlague = await listPlagueService.execute();

        return response.status(200).json({items: listPlague});
    }

    public async listByState(request: Request, response: Response): Promise<Response> {
        const {state} = request.params;

        const listPlagueStateService = new ListPlagueStateService();

        const listPlagueState = await listPlagueStateService.execute({state});

        return response.status(200).json({items: listPlagueState});
    }
}

export default PlagueController;