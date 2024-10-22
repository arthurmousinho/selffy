import { Cost } from "@application/entities/cost/cost.entity";
import { CostRepository } from "@application/repositories/cost.repository";
import { Pageable } from "@application/types/pageable.type";

export class InMemoryCostRepository implements CostRepository {

    public costs: Cost[] = [];

    public async create(cost: Cost): Promise<void> {
        this.costs.push(cost);
    }

    public async createMany(costs: Cost[]): Promise<void> {
        this.costs.push(...costs);
    }

    public async findAll(page: number, limit: number): Promise<Pageable<Cost>> {
        const costs = this.costs.slice((page - 1) * limit, page * limit);
        return {
            data: costs,
            meta: {
                page,
                limit,
                total: this.costs.length,
                totalPages: Math.ceil(this.costs.length / limit)
            }
        }
    }

    public async findById(id: string): Promise<Cost | null> {
        const cost = this.costs.find(cost => cost.getId() === id)
        return cost ?? null;
    }

    public async update(cost: Cost): Promise<void> {
        const index = this.costs.findIndex(item => item.getId() === cost.getId());
        if (index !== -1) {
            this.costs[index] = cost;
        }
    }

    public async delete(id: string): Promise<void> {
        this.costs = this.costs.filter(cost => cost.getId() !== id);
    }

    public async findManyByTitle(params: { title: string, page: number, limit: number }): Promise<Pageable<Cost>> {
        const costs = this.costs.filter(
            (cost) => cost.getTitle().toLowerCase().includes(params.title.toLowerCase())
        );
        const pageableCosts = costs.slice((params.page - 1) * params.limit, params.page * params.limit);
        return {
            data: pageableCosts,
            meta: {
                page: params.page,
                limit: params.limit,
                total: costs.length,
                totalPages: Math.ceil(costs.length / params.limit)
            }
        }
    }
    
    public async count(): Promise<number> {
        return this.costs.length;
    }

    public async sumValues(): Promise<number> {
        return this.costs.reduce((acc, cost) => acc + cost.getValue(), 0);
    }

}