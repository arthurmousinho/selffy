import { CostRepository } from "@application/repositories/cost.repository";
import { PrismaService } from "../prisma.service";
import { Cost } from "@application/entities/cost/cost.entity";
import { PrismaCostMapper } from "../mappers/prisma-cost.mapper";
import { Injectable } from "@nestjs/common";

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

    public async findAll(): Promise<Cost[]> {
        const costs = await this.prismaService.cost.findMany({
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
        });
        return costs.map(PrismaCostMapper.toDomain);
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

        return PrismaCostMapper.toDomain(cost);
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

    public async searchByTitle(title: string): Promise<Cost[]> {
        const costs = await this.prismaService.cost.findMany({
            where: {
                title: {
                    contains: title,
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
        });
        return costs.map(PrismaCostMapper.toDomain);
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