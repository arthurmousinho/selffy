import * as bcrypt from 'bcryptjs';

export class HashPasswordUseCase {

    public async execute(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

}