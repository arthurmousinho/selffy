import { Plan } from "@application/entities/plan/plan.entity";
import { PlanRepository } from "@application/repositories/plan.repository";

export class InMemoryPlanRepository implements PlanRepository {

    public plans: Plan[] = [];

    public async create(plan: Plan): Promise<void> {
        this.plans.push(plan);
    }
    
    public async findAll(): Promise<Plan[]> {
        return this.plans;
    }

    public async findById(id: string): Promise<Plan | null> {
        const plan = this.plans.find(plan => plan.getId() === id)
        return plan ?? null;
    }

    public async update(plan: Plan): Promise<void> {
        const index = this.plans.findIndex(item => item.getId() === plan.getId());
        if (index !== -1) {
            this.plans[index] = plan;
        }
    }

    public async delete(id: string): Promise<void> {
        this.plans = this.plans.filter(plan => plan.getId() !== id);
    }

    public async findManyByName(name: string): Promise<Plan[]> {
        const plans = this.plans.filter(plan => plan.getName() === name);
        return plans;
    }
    
}