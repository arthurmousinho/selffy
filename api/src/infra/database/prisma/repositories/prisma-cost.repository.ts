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

    public async findById(id: string): Promise<any> {
        return await this.prismaService.cost.findUnique({
            where: {
                id
            },
            include: {
                project: true
            }
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

}