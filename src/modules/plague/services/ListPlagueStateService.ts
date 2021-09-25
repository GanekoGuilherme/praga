import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';

class ListPlagueStateService {

    public async execute(state): Promise<any>{
      const farmsList = await Farm.find(state).select('_id');
      const plagueList = await Plague.find({farmId: {$in:farmsList}});
        
      return plagueList;
    }
}

export default ListPlagueStateService;