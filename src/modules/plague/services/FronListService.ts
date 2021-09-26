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
        //criar uma forma de retornar a porcentagem
        console.log(listWithOlnyName)
        const arroz = [];
        listWithOlnyName.map(
          (
            item
          ) => {
            arroz.find((a) => a.name === item);
            arroz.push();
          }
        )

        var counts = {};
        for (var i = 0; i < listWithOlnyName.length; i++)
          counts[listWithOlnyName[i]] = (counts[listWithOlnyName[i]] + 1) || 1;
        console.log(counts)
        //agora criar um obejto com o nome da chave e a porcentagem
        const item = {
          totalPlague: plagueList.length,
          plagueType: type
        }
        return item;
    }
}

export default FrontListService;