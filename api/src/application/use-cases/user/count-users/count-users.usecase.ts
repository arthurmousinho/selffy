import { UserRepository } from "@domain/repositories/user.repository";
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