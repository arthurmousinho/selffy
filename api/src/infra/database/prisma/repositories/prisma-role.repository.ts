import { Role } from "@application/entities/role/role.entity";
import { RoleRepository } from "@application/repositories/role.repository";
import { PrismaService } from "../prisma.service";
import { PrismaRoleMapper } from "../mappers/prisma-role.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaRoleRepository implements RoleRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) {}

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

    public async findAll(): Promise<Role[]> {
        const roles = await this.prismaService.role.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return roles.map(PrismaRoleMapper.toDomain);
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

    public async findManyByKey(key: string): Promise<Role[]> {
        const roles = await this.prismaService.role.findMany({
            where: {
                key: {
                    contains: key,
                    mode: "insensitive"
                }
            }
        });
        return roles.map(PrismaRoleMapper.toDomain);
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

}