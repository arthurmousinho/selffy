import { User } from "@application/entities/user/user";
import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllUsersUseCase {

    constructor(
        private userRespository: UserRepository
    ) {}

    public async execute(): Promise<User[]> {
        const users = await this.userRespository.findAll();
        return users;
    }

}