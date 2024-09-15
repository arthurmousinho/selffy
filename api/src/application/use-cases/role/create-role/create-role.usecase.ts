import { Role } from "@application/entities/role/role";
import { RoleAlreadyExistsError } from "@application/errors/role/role-already-exists.error";
import { RoleRepository } from "@application/repositories/role.repository";

export class CreateRoleUseCase {
    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async execute(newRole: Role) {
        const role = await this.roleRepository.findById(newRole.getId());
        if (role) {
            throw new RoleAlreadyExistsError();
        }

        await this.roleRepository.create(newRole);
    }
}