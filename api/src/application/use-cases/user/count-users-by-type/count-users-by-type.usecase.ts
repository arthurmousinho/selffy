import { UserType } from "@application/entities/user/user.entity";
import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountUsersByTypeUseCase {

    constructor(
        private usersRepository: UserRepository
    ){}

    public async execute(type: UserType) {
        const count = await this.usersRepository.countByType(type);
        return count;
    }

}