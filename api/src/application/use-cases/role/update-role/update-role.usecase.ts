import { Role } from "@application/entities/role/role.entity";
import { UserType } from "@application/entities/user/user.entity";
import { RoleNotFoundError } from "@application/errors/role/role-not-found.error";
import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

interface UpdateRoleUseCaseRequest {
    id: string;
    key: string;
    userTypes: UserType[];
}

@Injectable()
export class UpdateRoleUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) { }

    public async execute(request: UpdateRoleUseCaseRequest) {
        const { id, key, userTypes } = request;
        
        const taskExists = await this.roleRepository.findById(id);
        if (!taskExists) {
            throw new RoleNotFoundError();
        }

        const roleInstance = new Role({
            key,
            userTypes,
            createdAt: taskExists.getCreatedAt(),
            updatedAt: new Date(),
        }, id);

        await this.roleRepository.update(roleInstance);
    }

}