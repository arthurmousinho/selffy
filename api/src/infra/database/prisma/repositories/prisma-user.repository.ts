import { UserRepository } from "@application/repositories/user.repository";
import { PrismaService } from "../prisma.service";
import { PlanType, User, UserType } from "@application/entities/user/user.entity";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";
import { Injectable } from "@nestjs/common";
import { Pageable } from "@application/types/pageable.type";

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

    public async findManyByName(params: { name: string, page: number, limit: number }): Promise<Pageable<User>> {
        const [ users, total ] = await Promise.all([
            this.prismaService.user.findMany({
                skip: (params.page - 1) * params.limit,
                take: params.limit,
                where: {
                    name: {
                        contains: params.name,
                        mode: 'insensitive'
                    }
                },
                include: {
                    roles: true
                }
            }),
            this.prismaService.user.count({
                where: {
                    name: {
                        contains: params.name,
                        mode: 'insensitive'
                    }
                }
            })
        ])

        return {
            data: users.map(PrismaUserMapper.toDomain),
            meta: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages: Math.ceil(total / params.limit)
            }
        };
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

    public async findAll(page: number = 1, limit: number = 1): Promise<Pageable<User>> {
        const [users, total] = await Promise.all([
            this.prismaService.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    roles: true
                }
            }),
            this.count()
        ])

        return {
            data: users.map(PrismaUserMapper.toDomain),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    public async update(user: User): Promise<void> {
        const raw = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.update({
            where: {
                id: raw.id
            },
            data: {
                ...raw,
                roles: {
                    set: user.getRoles().map(role => ({ id: role.getId() }))
                }
            }
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

    public async countByType(type: UserType): Promise<number> {
        return this.prismaService.user.count({
            where: {
                type
            }
        });
    }

    public async countUsersCreatedAfter(date: Date): Promise<number> {
        return this.prismaService.user.count({
            where: {
                createdAt: {
                    gte: date
                }
            }
        });
    }

}