import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';
import PlagueImages from '../schemas/PlagueImages';

interface IRequestDTO {
  state: string;
  plagues: string[];
  dateBegin: boolean;
  dateEnd: string;
}

class ListPlagueStateWithFilterService {

    public async execute({ state, plagues, dateBegin, dateEnd }: IRequestDTO ): Promise<any>{
      const farmsList = await Farm.find({ state }).select('_id position.lat position.long position.radius');      
      const plagueList = await Plague.find({ farmId: { $in: farmsList.map((id) => id._id) }, name: { $in: plagues }, createdAt: { $gte: (dateBegin ? dateBegin : '0001-01-01'), $lt: (dateEnd ? dateEnd : '2100-01-01') } }).select('-createdAt -updatedAt');
      
      const plagueListWithPosition = plagueList.map((plague) => {
        const resp = {
          _id: plague._id,
          name: plague.name,
          active: plague.active,
          farm: farmsList.find((elem) => elem._id === plague.farmId)
        }
        return resp;
      });

      const plagueAndPhotoList = [];

      for (let index = 0; index < plagueListWithPosition?.length; index += 1){
        let photo = [];
        if (plagueList[index]?.photo === 'sim') {
            photo = await PlagueImages.find({ plagueId: plagueListWithPosition[index]._id });
        }
        const item = {
            _id: plagueListWithPosition[index]._id,
            name: plagueListWithPosition[index].name,
            active: plagueListWithPosition[index].active,
            farmId: {
                position: {
                  lat: plagueListWithPosition[index].farm?.position.lat,
                  long: plagueListWithPosition[index].farm?.position.long,
                  radius: plagueListWithPosition[index].farm?.position.radius,
                }
            },
            photo: photo?.map((img) => `https://praga-production.up.railway.app/uploads/${img.path}`,),
        }
        plagueAndPhotoList.push(item);
      }

      return plagueAndPhotoList;
    }
}

export default ListPlagueStateWithFilterService;