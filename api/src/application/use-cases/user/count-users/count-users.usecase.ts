import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountUsersUseCase {

    constructor(
        private userRepository: UserRepository
    ) {}

    public async execute() {
        return this.userRepository.count();
    }

}