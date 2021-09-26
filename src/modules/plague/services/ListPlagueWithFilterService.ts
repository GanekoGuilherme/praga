import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';

interface IRequestDTO {
  plagues: string[];
  dateBegin: boolean;
  dateEnd: string;
}

class ListPlagueWithFilterService {

    public async execute({ plagues, dateBegin, dateEnd }: IRequestDTO ): Promise<any>{   
      const plagueList = await Plague.find({ name: { $in: plagues }, createdAt: { $gte: (dateBegin ? dateBegin : '0001-01-01'), $lt: (dateEnd ? dateEnd : '2100-01-01') } }).select('-photo -createdAt -updatedAt').populate({path: 'farmId', model: 'Farm', select: 'position.lat position.long position.radius -_id'});;
      
      return plagueList;
    }
}

export default ListPlagueWithFilterService;