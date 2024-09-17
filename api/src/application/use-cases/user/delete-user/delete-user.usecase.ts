import { User } from "@application/entities/user/user";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@application/repositories/user.repository";

export class DeleteUserUsecase {

    constructor(
        private userRepository: UserRepository
    ){}

    public async execute(user: User) {
        const userExists = await this.userRepository.findById(user.getId());
        if (!userExists) {
            throw new UserNotFoundError();
        }

        await this.userRepository.delete(user.getId());
    }

}