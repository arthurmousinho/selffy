import { Cost } from "@application/entities/cost/cost";

export abstract class CostRepository {
    abstract create(cost: Cost): Promise<void>;
    abstract findAll(): Promise<Cost[]>;
    abstract findById(id: string): Promise<Cost | null>;
    abstract update(cost: Cost): Promise<void>;
    abstract delete(id: string): Promise<void>;
}