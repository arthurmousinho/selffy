import { Cost } from "@application/entities/cost/cost.entity";
import { CostRepository } from "@application/repositories/cost.repository";

export class InMemoryCostRepository implements CostRepository {

    public costs: Cost[] = [];

    public async create(cost: Cost): Promise<void> {
        this.costs.push(cost);
    }

    public async findAll(): Promise<Cost[]> {
        return this.costs;
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

    public async searchByTitle(title: string): Promise<Cost[]> {
        return this.costs.filter(cost => cost.getTitle().toLowerCase().includes(title.toLowerCase()));
    }

    public async count(): Promise<number> {
        return this.costs.length;
    }

    public async sumValues(): Promise<number> {
        return this.costs.reduce((acc, cost) => acc + cost.getValue(), 0);
    }

}