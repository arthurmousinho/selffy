import { Role } from "@application/entities/role/role.entity";
import { UserType } from "@application/entities/user/user.entity";
import { RoleRepository } from "@application/repositories/role.repository";

export class GetRolesForUserTypeUseCase {

    constructor(
        private roleRepository: RoleRepository
    ) { }

    public async execute(userType: UserType): Promise<Role[]> {

        if (userType === 'ADMIN') {
            return this.roleRepository.getRolesForAdminUser();
        }

        if (userType === 'DEFAULT') {
            return this.roleRepository.getRolesForDefaultUser();
        }

        return [];

    }

}