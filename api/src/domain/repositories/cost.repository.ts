import { Cost } from "src/domain/entities/cost/cost.entity";
import { Pageable } from "@application/shared/pageable.type";

export abstract class CostRepository {
    abstract create(cost: Cost): Promise<void>;
    abstract createMany(costs: Cost[]): Promise<void>;
    abstract findAll(page: number, limit: number): Promise<Pageable<Cost>>;
    abstract findById(id: string): Promise<Cost | null>;
    abstract update(cost: Cost): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract findManyByTitle(params: { title: string, page: number, limit: number }): Promise<Pageable<Cost>>;
    abstract count(): Promise<number>;
    abstract sumValues(): Promise<number>;
}