import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';

interface IRequestDTO {
  state: string;
  plagues: string[];
  dateBegin: boolean;
  dateEnd: string;
}

class ListPlagueStateWithFilterService {

    public async execute({ state, plagues, dateBegin, dateEnd }: IRequestDTO ): Promise<any>{
      const farmsList = await Farm.find({ state }).select('_id position.lat position.long position.radius');      
      const plagueList = await Plague.find({ farmId: { $in: farmsList.map((id) => id._id) }, name: { $in: plagues }, createdAt: { $gte: (dateBegin ? dateBegin : '0001-01-01'), $lt: (dateEnd ? dateEnd : '2100-01-01') } }).select('-photo -createdAt -updatedAt');
      
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

export default ListPlagueStateWithFilterService;