import { Plan } from "@application/entities/plan/plan.entity";

export abstract class PlanRepository {
    abstract create(plan: any): Promise<void>;
    abstract findAll(): Promise<Plan[]>;
    abstract findById(id: string): Promise<Plan | null>;
    abstract update(plan: any): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findManyByName(name: string): Promise<Plan[]>;
}