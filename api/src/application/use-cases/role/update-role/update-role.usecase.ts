import { Role } from "@application/entities/role/role.entity";
import { RoleNotFoundError } from "@application/errors/role/role-not-found.error";
import { RoleRepository } from "@application/repositories/role.repository";

export class UpdateRoleUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) { }

    public async execute(role: Role) {
        const taskExists = await this.roleRepository.findById(role.getId());
        if (!taskExists) {
            throw new RoleNotFoundError();
        }

        await this.roleRepository.update(role);
    }

}