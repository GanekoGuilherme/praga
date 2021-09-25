import Plague from '../schemas/Plague';

class ListPlagueService {

    public async execute(): Promise<any>{
        const plagueList = await Plague.find().select('-photo -createdAt -updatedAt').populate({path: 'farmId', model: 'Farm', select: 'position.lat position.long position.radius -_id'});
        
        return plagueList;
    }
}

export default ListPlagueService;