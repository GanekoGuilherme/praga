import User from '@modules/users/schemas/User';
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
        const userExists = await UserCredential.findOne({ email }).select('_id userId password');
        if (!userExists) throw new AppError('Usuário ou senha incorretos3.', 400);

        const passwordMatch = await compare(password, userExists.password);

        if (!passwordMatch) throw new AppError('Usuário ou senha incorretos2.', 400);

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userExists._id);

        const user = await User.findOne({ _id: userExists.userId });
        
        if (!user) throw new AppError('Usuário ou senha incorretos1.', 400);
        
        return { token, user };
    }
}

export default AuthenticateUserService;