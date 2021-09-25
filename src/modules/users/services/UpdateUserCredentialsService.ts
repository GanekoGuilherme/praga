import UserCredential from '../schemas/UserCredential';
import bcryptjs from 'bcryptjs';

interface IRequestDTO {
    password: string;
    email: string;
    userId: string;
}

class UpdateUserCredentialsService {

    public async execute({password, email, userId} : IRequestDTO): Promise<any>{
      const userVerify = await UserCredential.findOne({email});
      if(userVerify && userId !== userVerify.userId) throw new Error('Email já cadastrado.');
      const hash = await bcryptjs.hash(password, 10);
      const user = await UserCredential.updateOne({userId : userId}, {password: hash, email });
      return user;
    }
}

export default UpdateUserCredentialsService;