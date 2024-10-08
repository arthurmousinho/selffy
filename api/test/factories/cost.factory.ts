import { Cost } from "@application/entities/cost/cost.entity";
import { randomUUID } from "crypto";
import { makeProject } from "./project.factory";

export function makeCost() {
    const costId = randomUUID();

    const cost = new Cost({
        title: 'cost test title',
        value: 100,
        project: makeProject()
    }, costId);

    return cost;
}