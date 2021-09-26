import crypto from 'crypto';
import UserCredential from '@modules/users/schemas/UserCredential';

interface IRequestDTO {
  userCredentialsId: string;
}

class ResetPasswordService {

  public async execute({userCredentialsId} : IRequestDTO): Promise<any>{
    const token = crypto.randomBytes(20).toString('hex');
    
    const dateTokenExpires = new Date();
    dateTokenExpires.setHours(dateTokenExpires.getHours() + 24);
    
    await UserCredential.findByIdAndUpdate(userCredentialsId, {
      $set: {
        passwordToken: token,
        passwordTokenExpires: dateTokenExpires,
        passwordTokenActive: true,
      },
    });


    return token;
  }
}

export default ResetPasswordService;