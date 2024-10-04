import { UserRepository } from "@application/repositories/user.repository";

export class CountUsersUseCase {

    constructor(
        private userRepository: UserRepository
    ) {}

    public async execute() {
        return this.userRepository.count();
    }

}