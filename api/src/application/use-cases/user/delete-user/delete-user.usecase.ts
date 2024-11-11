import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUserUsecase {

    constructor(
        private userRepository: UserRepository
    ){}

    public async execute(id: string) {
        const userExists = await this.userRepository.findById(id);
        if (!userExists) {
            throw new UserNotFoundError();
        }

        await this.userRepository.delete(id);
    }

}