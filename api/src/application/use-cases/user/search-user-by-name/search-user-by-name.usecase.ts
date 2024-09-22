import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchUserByNameUseCase {

    constructor(
        private usersRepository: UserRepository
    ) {}

    public async execute(name: string) {
        const user = await this.usersRepository.findManyByName(name);
        return user;
    }

}