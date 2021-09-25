import { sign } from "jsonwebtoken";


class GenerateTokenProvider {

    async execute(userId: string) {
        const token = sign({}, 'c435b6e3-7327-4ffb-a05f-b831bb24f899', {
            subject: userId,
            expiresIn: '1h'
        });

        return token;
    }
}

export { GenerateTokenProvider };