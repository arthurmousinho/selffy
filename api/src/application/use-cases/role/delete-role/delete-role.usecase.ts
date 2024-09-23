import { Role } from "@application/entities/role/role.entity";
import { RoleNotFoundError } from "@application/errors/role/role-not-found.error";
import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteRoleUseCase {

    constructor(
        private roleRepository: RoleRepository
    ){}

    public async execute(id: string) {
        const roleExists = await this.roleRepository.findById(id);
        if (!roleExists) {
            throw new RoleNotFoundError();
        }

        await this.roleRepository.delete(id);
    }

}