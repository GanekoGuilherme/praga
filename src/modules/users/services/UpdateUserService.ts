import AppError from '@shared/errors/AppError';
import User from '../schemas/User';

interface IRequestDTO {
    name: string;
    taxId: string;
    userId: string;
}

class UpdateUserService {

    public async execute({ name, taxId, userId} : IRequestDTO): Promise<any>{
      const userVerify = await User.findOne({taxId});
      if(userVerify && userId !== userVerify._id) throw new AppError('CPF já cadastrado.', 400);   
      const user = await User.updateOne({_id : userId}, {name, taxId });
        
      return user;
    }
}

export default UpdateUserService;