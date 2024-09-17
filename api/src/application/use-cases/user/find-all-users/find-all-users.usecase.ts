import { UserRepository } from "@application/repositories/user.repository";

export class FindAllUsersUseCase {

    constructor(
        private userRespository: UserRepository
    ) {}

    public async execute() {
        return await this.userRespository.findAll();
    }

}