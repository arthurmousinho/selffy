import { Role } from "@application/entities/role/role.entity";
import { UserType } from "@application/entities/user/user.entity";
import { RoleRepository } from "@application/repositories/role.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetRolesForUserTypeUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async execute(userType: UserType): Promise<Role[]> {

        if (userType === 'ADMIN') {
            return await this.roleRepository.getRolesForAdminUser();
        }

        if (userType === 'DEFAULT') {
            return await this.roleRepository.getRolesForDefaultUser();
        }

        return [];

    }

}