import { Role } from "@application/entities/role/role.entity"
import { Role as RawRole } from "@prisma/client"

export class PrismaRoleMapper {

    public static toPrisma(role: Role): RawRole {
        return {
            id: role.getId(),
            key: role.getKey(),
            createdAt: role.getCreatedAt(),
            updatedAt: role.getUpdatedAt(),
            userTypes: role.getUserTypes(),
        }
    }

    public static toDomain(raw: RawRole): Role {
        return new Role({
            key: raw.key,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            userTypes: raw.userTypes
        }, raw.id)
    }

}