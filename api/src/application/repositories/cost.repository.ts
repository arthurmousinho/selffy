import { Cost } from "@application/entities/cost/cost.entity";

export abstract class CostRepository {
    abstract create(cost: Cost): Promise<void>;
    abstract findAll(): Promise<Cost[]>;
    abstract findById(id: string): Promise<Cost | null>;
    abstract update(cost: Cost): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract searchByTitle(title: string): Promise<Cost[]>;
    abstract count(): Promise<number>;
    abstract sumValues(): Promise<number>;
}