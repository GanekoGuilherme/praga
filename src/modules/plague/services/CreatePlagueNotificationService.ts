import { v4 as uuidv4 } from 'uuid';

import Farm from '@modules/farm/schemas/Farm';
import PlagueNotification from '../schemas/PlagueNotification';

interface IRequestDTO {
    message: string;
    farmId: string;
}

class CreatePlagueNotificationlService {

    public async execute({ message, farmId } : IRequestDTO): Promise<void>{
      const {state} = await Farm.findOne({_id: farmId}).select('state');
      
      const farmList = await Farm.find({state}).select('userId -_id');
      console.log(farmList)
      for(let i = 0; i < farmList.length; i+=1){
        const userId = farmList[i].userId;
        const x = await PlagueNotification.create({_id: uuidv4(), message, userId: userId});
        console.log(x)
      }
      
    }
}

export default CreatePlagueNotificationlService;