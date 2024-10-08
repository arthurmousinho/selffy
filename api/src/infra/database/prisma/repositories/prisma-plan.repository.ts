import { Plan } from "@application/entities/plan/plan.entity";
import { PrismaService } from "../prisma.service";
import { PlanRepository } from "@application/repositories/plan.repository";

export class PrismaPlanRepository implements PlanRepository {

    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    public async create(plan: Plan): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async findById(id: string): Promise<Plan | null> {
        throw new Error("Method not implemented.");
    }

    public async findAll(): Promise<Plan[]> {
        throw new Error("Method not implemented.");
    }

    public async update(plan: Plan): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async findManyByName(name: string): Promise<Plan[]> {
        throw new Error("Method not implemented.");
    }
    
}