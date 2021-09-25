import Plague from '../schemas/Plague';

class ListPlagueStateService {

    public async execute(state): Promise<any>{
      console.log(state)  
      const plagueList = await Plague.find({state : state}).populate({path: "farmId",model: "Farm"});
        
        return plagueList;
    }
}

export default ListPlagueStateService;