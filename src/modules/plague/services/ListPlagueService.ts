import Plague from '../schemas/Plague';
import PlagueImages from '../schemas/PlagueImages';

class ListPlagueService {

    public async execute(): Promise<any>{
        const plagueList = await Plague.find().select('-createdAt -updatedAt').populate({path: 'farmId', model: 'Farm', select: 'position.lat position.long position.radius -_id'});
        const plagueAndPhotoList = [];

        for (let index = 0; index < plagueList?.length; index += 1){
            let photo = [];
            if (plagueList[index]?.photo === 'sim') {
                photo = await PlagueImages.find({ plagueId: plagueList[index]._id });
            }
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

export default ListPlagueService;