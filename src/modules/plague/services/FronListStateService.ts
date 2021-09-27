import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';
import PlagueImages from '../schemas/PlagueImages';

class FrontListStateService {

    public async execute(state): Promise<any>{
        const farmsList = await Farm.find(state).select('_id position.lat position.long position.radius');
        const plagueList = await Plague.find({farmId: {$in:farmsList.map((id) => id._id)}});
        const plagueNameList = await Plague.find({farmId: {$in:farmsList.map((id) => id._id)}}).select('name');
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
          const plagueListDate = await Plague.find({ farmId: {$in:farmsList.map((id) => id._id)}, createdAt: { $gte: (dateBegin ? dateBegin : '0001-01-01'), $lt: (dateEnd ? dateEnd : '2100-01-01') } }).select('-photo -updatedAt')
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

export default FrontListStateService;