import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllRolesUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async execute(page?: number, limit?: number) {
        if (!page || page < 1) {
            page = 1;
        }

        if (!limit || limit < 1) {
            limit = 1;
        }

        const pageableRoles =  await this.roleRepository.findAll(page, limit);
        return pageableRoles;
    }

}