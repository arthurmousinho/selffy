import { Role } from "@application/entities/role/role.entity";
import { RoleRepository } from "@application/repositories/role.repository";
import { PrismaService } from "../prisma.service";
import { PrismaRoleMapper } from "../mappers/prisma-role.mapper";
import { Injectable } from "@nestjs/common";
import { UserType } from "@application/entities/user/user.entity";
import { Pageable } from "@application/types/pageable.type";

@Injectable()
export class PrismaRoleRepository implements RoleRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(role: Role) {
        const raw = PrismaRoleMapper.toPrisma(role);
        await this.prismaService.role.create({
            data: raw
        })
    }

    public async createMany(roles: Role[]): Promise<void> {
        const raws = roles.map(PrismaRoleMapper.toPrisma);
        await this.prismaService.role.createMany({
            data: raws
        });
    }

    public async findAll(page: number = 1, limit: number = 1): Promise<Pageable<Role>> {
        const [roles, total] = await Promise.all([
            await this.prismaService.role.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                }
            }),
            await this.count()
        ])

        return {
            data: roles.map(PrismaRoleMapper.toDomain),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    public async findById(id: string): Promise<Role | null> {
        const role = await this.prismaService.role.findUnique({
            where: {
                id
            }
        });
        if (!role) {
            return null;
        }
        return PrismaRoleMapper.toDomain(role);
    }

    public async findByKey(key: string): Promise<Role | null> {
        const role = await this.prismaService.role.findUnique({
            where: {
                key
            }
        });
        if (!role) {
            return null;
        }
        return PrismaRoleMapper.toDomain(role);
    }

    public async findManyByKey(params: { key: string, page: number, limit: number }): Promise<Pageable<Role>> {
        const [ roles, total ] = await Promise.all([
            this.prismaService.role.findMany({
                skip: (params.page - 1) * params.limit,
                take: params.limit,
                where: {
                    key: {
                        contains: params.key,
                        mode: "insensitive"
                    }
                }
            }),
            this.prismaService.role.count({
                where: {
                    key: {
                        contains: params.key,
                        mode: "insensitive"
                    }
                }
            }),
        ])

        return {
            data: roles.map(PrismaRoleMapper.toDomain),
            meta: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages: Math.ceil(total / params.limit)
            }
        };
    }

    public async update(role: Role): Promise<void> {
        const raw = PrismaRoleMapper.toPrisma(role);
        await this.prismaService.role.update({
            where: {
                id: role.getId()
            },
            data: raw
        })
    }

    public async delete(id: string): Promise<void> {
        await this.prismaService.role.delete({
            where: {
                id
            }
        })
    }

    public async getRolesForAdminUser(): Promise<Role[]> {
        const roles = await this.prismaService.role.findMany({
            where: {
                userTypes: {
                    has: "ADMIN"
                }
            }
        });
        return roles.map(PrismaRoleMapper.toDomain);
    }

    public async getRolesForDefaultUser(): Promise<Role[]> {
        const roles = await this.prismaService.role.findMany({
            where: {
                userTypes: {
                    has: "DEFAULT"
                }
            }
        });
        return roles.map(PrismaRoleMapper.toDomain);
    }

    public async count(): Promise<number> {
        const count = await this.prismaService.role.count();
        return count;
    }

    public async countByUserType(userType: UserType): Promise<number> {
        const count = await this.prismaService.role.count({
            where: {
                userTypes: {
                    has: userType
                }
            }
        });
        return count;
    }

}