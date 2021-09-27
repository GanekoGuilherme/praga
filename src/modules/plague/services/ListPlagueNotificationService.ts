import FarmController from '@modules/farm/controllers/FarmController';
import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';
import PlagueNotification from '../schemas/PlagueNotification';

class ListPlagueNotificationService {

    public async execute(userId): Promise<any>{
      const plagueNotificationList = await PlagueNotification.find(userId).sort({createdAt: -1});
      return plagueNotificationList;
    }
}

export default ListPlagueNotificationService;