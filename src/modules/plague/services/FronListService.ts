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
        const b = []
        for (var i = 1; i < 8; i++){
          const dateEnd = new Date();
          dateEnd.setHours(dateEnd.getHours() - 24*(i-1))
          const dateBegin = new Date();
          dateBegin.setHours(dateBegin.getHours() - 24*i);
          const plagueListDate = await Plague.find({  createdAt: { $gte: (dateBegin ? dateBegin : '0001-01-01'), $lt: (dateEnd ? dateEnd : '2100-01-01') } }).select('-photo -updatedAt')
          b.push({date: dateEnd, qtd: plagueListDate.length})
        }
        console.log(b)
        const item = {
          totalPlague: plagueList.length,
          percentList: a,
          caseDays: b,
          plagueType: type
        }
        return item;
    }
}

export default FrontListService;