import { UserRepository } from "@application/repositories/user.repository";
import { PrismaService } from "../prisma.service";
import { PlanType, User } from "@application/entities/user/user.entity";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(user: User): Promise<void> {
        const raw = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.create({
            data: {
                ...raw,
                roles: {
                    connect: user.getRoles().map(role => ({ id: role.getId() }))
                }
            },
            include: {
                roles: true
            }
        })
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            },
            include: {
                roles: true
            }
        });

        if (!user) {
            return null;
        }

        return PrismaUserMapper.toDomain(user);
    }

    public async findManyByName(name: string): Promise<User[]> {
        const users = await this.prismaService.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            },
            include: {
                roles: true
            }
        });
        return users.map(PrismaUserMapper.toDomain);
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            },
            include: {
                roles: true
            }
        });
        if (!user) {
            return null;
        }
        return PrismaUserMapper.toDomain(user);
    }

    public async findAll(): Promise<User[]> {
        const users = await this.prismaService.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                roles: true
            }
        });
        return users.map(PrismaUserMapper.toDomain);
    }

    public async update(user: User): Promise<void> {
        const raw = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }

    public async delete(id: string): Promise<void> {
        await this.prismaService.user.delete({
            where: {
                id
            }
        });
    }

    public async count(): Promise<number> {
        return this.prismaService.user.count();
    }

    public async countByPlan(plan: PlanType): Promise<number> {
        return this.prismaService.user.count({
            where: {
                plan
            }
        });
    }

}