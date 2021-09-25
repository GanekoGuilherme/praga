import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';

class ListPlagueStateService {

    public async execute(state): Promise<any>{
      const farmsList = await Farm.find(state).select('_id position.lat position.long position.radius');
      const plagueList = await Plague.find({farmId: {$in:farmsList.map((id) => id._id)}}).select('-photo -createdAt -updatedAt');
      
      const plagueListWithPosition = plagueList.map((plague) => {
        const resp = {
          _id: plague._id,
          name: plague.name,
          active: plague.active,
          farm: farmsList.find((elem) => elem._id === plague.farmId)
        }
        return resp;
      });

      return plagueListWithPosition;
    }
}

export default ListPlagueStateService;