import { UserType } from "@application/entities/user/user.entity";
import { RoleRepository } from "@application/repositories/role.repository";
import { PrismaRoleMapper } from "@infra/database/prisma/mappers/prisma-role.mapper";
import { Injectable } from "@nestjs/common";
import { MOCK_ROLES } from "src/mocks/role.mock";

@Injectable()
export class RoleSeeder {

    constructor(
        private roleRepository: RoleRepository
    ) {}

    public async run() {
        const roles = await this.roleRepository.findAll();
        if (roles.length > 0) {
            return;
        }

        const rolesInstances = MOCK_ROLES.map(role => PrismaRoleMapper.toDomain({
            id: role.id,
            key: role.key,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
            userTypes: role.userTypes as UserType[]
        }))

        await this.roleRepository.createMany(rolesInstances);
    }

}