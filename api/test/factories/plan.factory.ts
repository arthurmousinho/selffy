import { Plan } from "@application/entities/plan/plan.entity";

export function makePlan() {
    const plan = new Plan({
        name: 'test',
        description: 'test',
        price: 100,
    });
    
    return plan;
}