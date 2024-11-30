import { UserRepository } from "@domain/repositories/user.repository";
import { FindUserByIdUseCase } from "../find-user-by-id/find-user-by-id.usecase";
import * as bcrypt from 'bcryptjs';
import { InvalidUserCredentialsError } from "@application/errors/user/invalid-user-credentials.error";
import { Injectable } from "@nestjs/common";

interface Request {
    requestUserId: string;
    userId: string;
    currentPassword: string;
    newPassword: string;
}

@Injectable()
export class ChangeUserPasswordUseCase {

    constructor(
        private userRespository: UserRepository,
        private findUserByIdUseCase: FindUserByIdUseCase,
    ) { }

    public async execute(request: Request) {
        const [user, requestUser] = await Promise.all([
            this.findUserByIdUseCase.execute({
                userId: request.userId,
                requestUserId: request.requestUserId,
            }),
            this.findUserByIdUseCase.execute({
                userId: request.requestUserId,
                requestUserId: request.requestUserId,
            })
        ]);

        const passwordMatched = await bcrypt.compare(
            request.currentPassword,
            user.getPassword()
        );

        if (!passwordMatched) {
            throw new InvalidUserCredentialsError();
        }

        const newHashedPassword = await this.hashPassword(request.newPassword);
        user.setPassword(newHashedPassword);

        await this.userRespository.update(user);
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

}