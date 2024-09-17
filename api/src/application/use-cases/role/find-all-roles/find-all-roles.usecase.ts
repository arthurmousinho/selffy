import { RoleRepository } from "@application/repositories/role.repository";

export class FindAllRolesUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async execute() {
        return await this.roleRepository.findAll();
    }

}