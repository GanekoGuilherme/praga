import { Request, Response } from 'express';
import CreatePlagueService from '../services/CreatePlagueService';
import ListPlagueService from '../services/ListPlagueService';
import ListPlagueStateService from '../services/ListPlagueStateService';
import ListPlagueWithFilterService from '../services/ListPlagueWithFilterService';
import UpdatePlagueService from '../services/UpdatePlagueService';

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
    
    public async update(request: Request, response: Response): Promise<Response> {
        const{name, photo, active} = request.body;
        
        const{plagueId} = request.params;
        
        const updatePlagueService = new UpdatePlagueService();
        
        await updatePlagueService.execute({name, photo, active, plagueId});
        
        return response.status(200).json({msg: `Praga atualizado com sucesso.`})
    }

    public async listByStateWithFilter(request: Request, response: Response): Promise<Response> {
        const { state } = request.params;
        const { plagues, dateBegin, dateEnd } = request.body;

        const listPlagueWithFilterService = new ListPlagueWithFilterService();

        const listPlague = await listPlagueWithFilterService.execute({ state, plagues, dateBegin, dateEnd });

        return response.status(200).json({items: listPlague});
    }
    
}

export default PlagueController;