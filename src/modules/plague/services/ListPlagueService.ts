import Plague from '../schemas/Plague';

class ListPlagueService {

    public async execute(): Promise<any>{
        const plagueList = await Plague.find();
        
        return plagueList;
    }
}

export default ListPlagueService;