import { RoleNotFoundError } from "@application/errors/role/role-not-found.error";
import { RoleRepository } from "@application/repositories/role.repository";

export class FindRoleByIdUseCase {

    constructor(
        private roleRepository: RoleRepository
    ){}

    public async execute(id: string) {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new RoleNotFoundError();
        }

        return role;
    }

}