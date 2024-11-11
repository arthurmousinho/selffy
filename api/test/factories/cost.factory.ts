import { Cost } from "src/domain/entities/cost/cost.entity";
import { randomUUID } from "crypto";
import { makeProject } from "./project.factory";

export function makeCost(props?: { title?: string }) {
    const costId = randomUUID();

    const cost = new Cost({
        title: props?.title ?? 'cost test title',
        value: 100,
        project: makeProject()
    }, costId);

    return cost;
}