import { UserRepository } from "@application/repositories/user.repository";
import { PrismaService } from "../prisma.service";
import { Role, User } from "@application/entities/user/user.entity";
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
            data: raw
        })
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
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

    public async countByRole(role: Role): Promise<number> {
        return await this.prismaService.user.count({
            where: {
                role
            }
        });
    }

    public async countUsersCreatedAfter(date: Date): Promise<number> {
        return await this.prismaService.user.count({
            where: {
                createdAt: {
                    gte: date
                }
            }
        });
    }

}