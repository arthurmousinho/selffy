import { CostRepository } from "@domain/repositories/cost.repository";
import { PrismaService } from "../prisma.service";
import { Cost } from "src/domain/entities/cost/cost.entity";
import { PrismaCostMapper } from "../mappers/prisma-cost.mapper";
import { Injectable } from "@nestjs/common";
import { Pageable } from "@application/shared/pageable.type";
import { PrismaProjectMapper } from "../mappers/prisma-project.mapper";

@Injectable()
export class PrismaCostRepository implements CostRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(cost: Cost): Promise<any> {
        const raw = PrismaCostMapper.toPrisma(cost);
        return await this.prismaService.cost.create({
            data: raw
        });
    }

    public async createMany(costs: Cost[]): Promise<void> {
        const raw = costs.map(PrismaCostMapper.toPrisma);
        await this.prismaService.cost.createMany({
            data: raw
        });
    }

    public async findAll(page: number, limit: number): Promise<Pageable<Cost>> {
        const [costs, total] = await Promise.all([
            this.prismaService.cost.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    project: {
                        include: {
                            owner: true
                        }
                    }
                }
            }),
            this.prismaService.project.count()
        ]);

        return {
            data: costs.map(cost => PrismaCostMapper.toDomain({
                ...cost,
                project: PrismaProjectMapper.toDomain(cost.project)
            })),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    public async findById(id: string): Promise<Cost | null> {
        const cost = await this.prismaService.cost.findUnique({
            where: {
                id
            },
            include: {
                project: {
                    include: {
                        owner: true
                    }
                }
            }
        });

        if (!cost) {
            return null;
        }

        return PrismaCostMapper.toDomain({
            ...cost,
            project: PrismaProjectMapper.toDomain(cost.project)
        });
    }

    public async update(cost: Cost): Promise<void> {
        const raw = PrismaCostMapper.toPrisma(cost);
        await this.prismaService.cost.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }

    public async delete(id: string): Promise<void> {
        await this.prismaService.cost.delete({
            where: {
                id
            }
        });
    }

    public async findManyByTitle(params: { title: string, page: number, limit: number }): Promise<Pageable<Cost>> {
        const [costs, total] = await Promise.all([
            this.prismaService.cost.findMany({
                skip: (params.page - 1) * params.limit,
                take: params.limit,
                where: {
                    title: {
                        contains: params.title,
                        mode: 'insensitive'
                    }
                },
                include: {
                    project: {
                        include: {
                            owner: true
                        }
                    }
                }
            }),
            this.prismaService.cost.count({
                where: {
                    title: {
                        contains: params.title,
                        mode: 'insensitive'
                    }
                }
            })
        ])

        return {
            data: costs.map(cost => PrismaCostMapper.toDomain({
                ...cost,
                project: PrismaProjectMapper.toDomain(cost.project)
            })),
            meta: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages: Math.ceil(total / params.limit)
            }
        };
    }

    public async findManyByProjectId(projectId: string): Promise<Cost[]> {
        const costs = await this.prismaService.cost.findMany({
            where: {
                projectId
            },
            include: {
                project: {
                    include: {
                        owner: true
                    }
                }
            }
        });
        return costs.map(cost => PrismaCostMapper.toDomain({
            ...cost,
            project: PrismaProjectMapper.toDomain(cost.project)
        }));
    }

    public async count(): Promise<number> {
        const count = await this.prismaService.cost.count();
        return count;
    }

    public async sumValues(): Promise<number> {
        const sum = await this.prismaService.cost.aggregate({
            _sum: {
                value: true
            }
        });
        return sum._sum.value || 0;
    }

}