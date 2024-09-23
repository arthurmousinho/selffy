import { Role } from "@application/entities/role/role.entity";
import { UserType } from "@application/entities/user/user.entity";
import { RoleAlreadyExistsError } from "@application/errors/role/role-already-exists.error";
import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

interface CreateRoleUseCaseRequest {
    key: string;
    userTypes: UserType[];
}

interface CreateRoleUseCaseResponse {
    role: Role;
}

@Injectable()
export class CreateRoleUseCase {
    
    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async execute(request: CreateRoleUseCaseRequest): Promise<CreateRoleUseCaseResponse> {
        const { key, userTypes } = request;

        const roleExists = await this.roleRepository.findByKey(key);
        if (roleExists) {
            throw new RoleAlreadyExistsError();
        }

        const newRole = new Role({
            key,
            userTypes
        });

        await this.roleRepository.create(newRole);

        return { role: newRole };
    }

}