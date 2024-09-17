import { Role } from "@application/entities/role/role";
import { RoleNotFoundError } from "@application/errors/role/role-not-found.error";
import { RoleRepository } from "@application/repositories/role.repository";

export class DeleteRoleUseCase {

    constructor(
        private roleRepository: RoleRepository
    ){}

    public async execute(role: Role) {
        const roleExists = await this.roleRepository.findById(role.getId());
        if (!roleExists) {
            throw new RoleNotFoundError();
        }

        await this.roleRepository.delete(role.getId());
    }

}