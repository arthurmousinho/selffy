import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

interface SearchUserByNameUseCaseRequest {
    name: string;
    page: number;
    limit: number;
}

@Injectable()
export class SearchUserByNameUseCase {

    constructor(
        private usersRepository: UserRepository
    ) {}

    public async execute(request: SearchUserByNameUseCaseRequest) {
        const pageableUsers = await this.usersRepository.findManyByName(request);
        return pageableUsers;
    }

}