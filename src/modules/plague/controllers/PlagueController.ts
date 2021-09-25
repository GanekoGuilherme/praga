import { Request, Response } from 'express';
import CreatePlagueNotificationlService from '../services/CreatePlagueNotificationService';
import CreatePlagueService from '../services/CreatePlagueService';
import ListPlagueService from '../services/ListPlagueService';
import ListPlagueStateService from '../services/ListPlagueStateService';
import UpdatePlagueService from '../services/UpdatePlagueService';
import ListPlagueNotificationService from '../services/ListPlagueNotificationService';

class PlagueController {

    public async store(request: Request, response: Response): Promise<Response> {
        const {name, photo, active, farmId} = request.body;
        
        const createPlagueService = new CreatePlagueService();

        const plague = await createPlagueService.execute({ name, photo, active, farmId});
        
        const createPlagueNotificationService = new CreatePlagueNotificationlService();

        const message = `Praga do tipo ${name} registrada no seu estado`;

        await createPlagueNotificationService.execute({ message, farmId });

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

    public async getNotification(request: Request, response: Response): Promise<Response> {
        const {userId} = request.params;

        const listPlagueNotificationService = new ListPlagueNotificationService();

        const listPlagueNotification = await listPlagueNotificationService.execute({userId});

        return response.status(200).json({items: listPlagueNotification});
    }
}

export default PlagueController;