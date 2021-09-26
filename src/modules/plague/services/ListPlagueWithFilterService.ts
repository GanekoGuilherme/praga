import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';
import PlagueImages from '../schemas/PlagueImages';

interface IRequestDTO {
  plagues: string[];
  dateBegin: boolean;
  dateEnd: string;
}

class ListPlagueWithFilterService {

    public async execute({ plagues, dateBegin, dateEnd }: IRequestDTO ): Promise<any>{   
      const plagueList = await Plague.find({ name: { $in: plagues }, createdAt: { $gte: (dateBegin ? dateBegin : '0001-01-01'), $lt: (dateEnd ? dateEnd : '2100-01-01') } }).select('-photo -createdAt -updatedAt').populate({path: 'farmId', model: 'Farm', select: 'position.lat position.long position.radius -_id'});      
      const plagueAndPhotoList = [];

        for (let index = 0; index < plagueList?.length; index += 1){
            const photo = await PlagueImages.find({ plagueId: plagueList[index]._id });
            const item = {
                _id: plagueList[index]._id,
                name: plagueList[index].name,
                active: plagueList[index].active,
                farmId: {
                    position: {
                      lat: plagueList[index].farmId?.position.lat,
                      long: plagueList[index].farmId?.position.long,
                      radius: plagueList[index].farmId?.position.radius,
                    }
                },
                photo: photo?.map((img) => `https://praga-production.up.railway.app/uploads/${img.path}`,),
            }
            plagueAndPhotoList.push(item);
        }

      return plagueAndPhotoList;
    }
}

export default ListPlagueWithFilterService;