import { User } from "@application/entities/user/user";
import { UserAlreadyExistsError } from "@application/errors/user/user-already-exists.error";
import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserUseCase {

    constructor(
        private userRepository: UserRepository
    ) { }

    public async execute(newUser: User) {
        const user = await this.userRepository.findById(newUser.getId());
        if (user) {
            throw new UserAlreadyExistsError();
        }

        await this.userRepository.create(newUser);
    }

}