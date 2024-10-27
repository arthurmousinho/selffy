import { User } from "@application/entities/user/user.entity";
import { User as RawUser } from "@prisma/client";


export class PrismaUserMapper {

    public static toPrisma(user: User): RawUser {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        };
    }

    public static toDomain(raw: RawUser): User {
        return new User({
            name: raw.name,
            email: raw.email,
            password: raw.password,
            role: raw.role,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, raw.id)
    }

}