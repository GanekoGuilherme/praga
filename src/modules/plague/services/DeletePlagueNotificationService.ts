import PlagueNotification from '../schemas/PlagueNotification';

interface IRequestDTO {
    notificationId: string;
}

class DeletePlagueNotificationService {

    public async execute({ notificationId } : IRequestDTO): Promise<any>{
        const plague = await PlagueNotification.deleteOne({_id : notificationId});
        
        return plague;
    }
}

export default DeletePlagueNotificationService;