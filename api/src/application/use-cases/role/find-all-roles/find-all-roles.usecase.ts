import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllRolesUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async execute() {
        return await this.roleRepository.findAll();
    }

}