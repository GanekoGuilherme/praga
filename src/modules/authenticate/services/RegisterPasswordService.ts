import User from '@modules/users/schemas/User';
import UserCredential from '@modules/users/schemas/UserCredential';
import AppError from '@shared/errors/AppError';
import bcryptjs from 'bcryptjs'

interface IRequestDTO {
  tokenURL: string;
  password: string;
}

class RegisterPasswordService {

  public async execute({ tokenURL, password }: IRequestDTO): Promise<string> {
    // buscando no banco as credenciais do usuário
    const userCredentials = await UserCredential.findOne({
      passwordToken: tokenURL,
    });

    // validações do token
    if (!userCredentials) {
      throw new AppError('Token inválido, solicite novamente.', 401);
    }

    if (userCredentials.passwordTokenActive === false) {
      throw new AppError('Token inválido, solicite novamente.', 401);
    }

    const dateNow = new Date();
    if (dateNow > userCredentials.passwordTokenExpires) {
      throw new AppError('Token inválido, solicite novamente.', 401);
    }

    const user = await User.findById(userCredentials.userId);

    // criptografando a senha para salvar no banco
    const hash = await bcryptjs.hash(password, 10);
    await UserCredential.findByIdAndUpdate(userCredentials._id, {
      $set: {
        password: hash,
        passwordTokenActive: false,
      },
    });

    return userCredentials.email;
  }
}

export default RegisterPasswordService