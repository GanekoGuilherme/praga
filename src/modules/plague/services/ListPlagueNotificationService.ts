import FarmController from '@modules/farm/controllers/FarmController';
import Farm from '@modules/farm/schemas/Farm';
import Plague from '../schemas/Plague';
import PlagueNotification from '../schemas/plagueNotification';

class ListPlagueNotificationService {

    public async execute(userId): Promise<any>{
      //consultar uma lista de notificações de acordo com o userid
      const plagueNotificationList = await PlagueNotification.find(userId);
      return plagueNotificationList;
    }
}

export default ListPlagueNotificationService;