import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindUserByIdUseCase {

    constructor(
        private userRepository: UserRepository
    ){}

    public async execute(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

}