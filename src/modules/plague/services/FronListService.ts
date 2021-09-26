import Plague from '../schemas/Plague';
import PlagueImages from '../schemas/PlagueImages';

class FrontListService {

    public async execute(): Promise<any>{
        const plagueList = await Plague.find();
        const plagueNameList = await Plague.find().select('name');
        const listWithOlnyName = plagueNameList.map((item) => item.name);        
        const listWithoutRepeatName = listWithOlnyName.filter(function(item, pos) {
            return listWithOlnyName.indexOf(item) == pos;
        });
        let type = listWithoutRepeatName.length
        const plagueNameList2 = await Plague.find().select('name -_id');
        var counts = {};
        for (var i = 0; i < listWithOlnyName.length; i++){
          counts[listWithOlnyName[i]] = (counts[listWithOlnyName[i]] + 1) || 1;
        }
        var result = Object.keys(counts).map((key) => [String(key), counts[key]]);
        const a = [];
        for (var i = 0; i < result.length; i++){
          const percent = (result[i][1])/(plagueList.length)
          a.push({type: result[i][0], percent: percent})
        }
        const dateEnd = Date.now();
        const dateBegin = new Date();
        dateBegin.setHours(dateBegin.getHours() - 24*7);
        const plagueListDate = await Plague.find({  createdAt: { $gte: (dateBegin ? dateBegin : '0001-01-01'), $lt: (dateEnd ? dateEnd : '2100-01-01') } }).select('-photo -createdAt -updatedAt')
        console.log(plagueListDate)
        const item = {
          totalPlague: plagueList.length,
          percentList: a,
          plagueType: type
        }
        return item;
    }
}

export default FrontListService;