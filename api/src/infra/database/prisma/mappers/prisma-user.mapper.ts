import { User } from "@application/entities/user/user.entity";
import { User as RawUser, Role as PrismaRawRole, Role } from "@prisma/client";
import { PrismaRoleMapper } from "./prisma-role.mapper";


export class PrismaUserMapper {

    public static toPrisma(user: User): RawUser {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            type: user.getType(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        };
    }

    public static toDomain(raw: RawUser & { roles: Role[] }): User {
        return new User({
            name: raw.name,
            email: raw.email,
            password: raw.password,
            type: raw.type,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            roles: raw.roles.map(PrismaRoleMapper.toDomain)
        }, raw.id)
    }

}