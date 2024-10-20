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
        if (!request.page || request.page < 1) {
            request.page = 1;
        }

        if (!request.limit || request.limit < 1) {
            request.limit = 10;
        }

        const pageableUsers = await this.usersRepository.findManyByName(request);
        return pageableUsers;
    }

}