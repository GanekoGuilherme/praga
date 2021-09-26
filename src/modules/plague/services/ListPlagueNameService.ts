import Plague from '../schemas/Plague';
import PlagueImages from '../schemas/PlagueImages';

class ListPlagueNameService {

    public async execute(): Promise<any>{
        const plagueNameList = await Plague.find().select('name');
        const listWithOlnyName = plagueNameList.map((item) => item.name);        
        
        const listWithoutRepeatName = listWithOlnyName.filter(function(item, pos) {
            return listWithOlnyName.indexOf(item) == pos;
        });
        return listWithoutRepeatName;
    }
}

export default ListPlagueNameService;