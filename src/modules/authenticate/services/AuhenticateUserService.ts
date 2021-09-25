import UserCredential from '@modules/users/schemas/UserCredential';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { GenerateTokenProvider } from '../providers/GenerateTokenProvider';

interface IRequestDTO {
    email: string;
    password: string;
}

class AuthenticateUserService {

    public async execute({ email, password } : IRequestDTO): Promise<any>{
        const userAlreadyExists = await UserCredential.findOne({ email }).select('_id password');
        if (!userAlreadyExists) throw new AppError('Usuário ou senha incorretos.', 400);

        const passwordMatch = await compare(password, userAlreadyExists.password);

        if(!passwordMatch) throw new AppError('Usuário ou senha incorretos.', 400);

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userAlreadyExists._id);

        return { token };
    }
}

export default AuthenticateUserService;