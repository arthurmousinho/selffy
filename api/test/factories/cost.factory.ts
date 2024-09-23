import { Cost } from "@application/entities/cost/cost.entity";
import { randomUUID } from "crypto";

export function makeCost() {
    const costId = randomUUID();

    const cost = new Cost({
        title: 'cost test title',
        value: 100
    }, costId);

    return cost;
}