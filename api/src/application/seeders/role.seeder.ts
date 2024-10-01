import { Role } from "@application/entities/role/role.entity";
import { UserType } from "@application/entities/user/user.entity";
import { RoleRepository } from "@application/repositories/role.repository";
import { MOCK_ROLES } from "src/mocks/role.mock";

export class RoleSeeder {

    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async run() {
        const roles = await this.roleRepository.findAll();
        if (roles.length > 0) {
            return;
        }
        
        const rolesInstances: Role[] = MOCK_ROLES.map(role => {
            return new Role({
                key: role.key,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt,
                userTypes: role.userTypes as UserType[]
            }, role.id)
        });

        await this.roleRepository.createMany(rolesInstances);
    }

}