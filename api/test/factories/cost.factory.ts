import { Cost } from "@domain/entities/cost/cost.entity";
import { randomUUID } from "crypto";
import { makeProject } from "./project.factory";
import { Project } from "@domain/entities/project/project.entity";

export function makeCost(props?: { title?: string, value?: number, project?: Project }) {
    const costId = randomUUID();

    const cost = new Cost({
        title: props?.title ?? 'cost test title',
        value: props?.value ?? 100,
        project: props?.project ?? makeProject()
    }, costId);

    return cost;
}