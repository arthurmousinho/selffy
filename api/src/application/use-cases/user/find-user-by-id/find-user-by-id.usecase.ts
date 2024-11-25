import { UnauthorizedUserError } from "@application/errors/user/unauthorized-user.error";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";

interface Request {
    userId: string;
    requestUserId: string;
}

@Injectable()
export class FindUserByIdUseCase {

    constructor(
        private userRepository: UserRepository
    ) { }

    public async execute(request: Request) {
        const [requestUser, user] = await Promise.all([
            this.userRepository.findById(request.requestUserId),
            this.userRepository.findById(request.userId)
        ])

        if (!user || !requestUser) {
            throw new UserNotFoundError();
        }

        const isAdmin = requestUser.getRole() === 'ADMIN';
        const isOwnUser = requestUser.getId() === user.getId();

        if (!isAdmin && !isOwnUser) {
            throw new UnauthorizedUserError();
        }

        return user;
    }

}