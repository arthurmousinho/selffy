import { User } from "@application/entities/user/user.entity";
import { UserRepository } from "@application/repositories/user.repository";
import { Pageable } from "@application/types/pageable.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllUsersUseCase {

    constructor(
        private userRespository: UserRepository
    ) { }

    public async execute(page?: number, limit?: number): Promise<Pageable<User>> {
        if (!page || page < 1) {
            page = 1;
        }

        if (!limit || limit < 1) {
            limit = 1;
        }

        const pagableUsers = await this.userRespository.findAll(page, limit);
        return pagableUsers;
    }

}