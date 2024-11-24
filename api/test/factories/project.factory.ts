import { Project, ProjectStatus } from "@domain/entities/project/project.entity";
import { randomUUID } from "crypto";
import { makeUser } from "./user.factory";
import { Task } from "src/domain/entities/task/task.entity";
import { User } from "src/domain/entities/user/user.entity";
import { Cost } from "@domain/entities/cost/cost.entity";

export function makeProject(props?: {
    id?: string,
    title?: string,
    description?: string,
    revenue?: number,
    tasks?: Task[],
    status?: ProjectStatus,
    owner?: User,
    color?: string,
    icon?: string,
    createdAt?: Date,
    costs?: Cost[],
    isPinned?: boolean,
}) {
    const projectId = props?.id ?? randomUUID();
    const projectOwner = props?.owner ?? makeUser();

    const project = new Project({
        title: props?.title ?? "Project test",
        description: props?.description ?? "Testing project description",
        revenue: props?.revenue ?? 1000,
        tasks: props?.tasks ?? [],
        owner: projectOwner,
        status: props?.status ?? "IN_PROGRESS",
        color: props?.color ?? "#000000",
        icon: props?.icon ?? "👍🏻",
        createdAt: props?.createdAt ?? new Date(),
        costs: props?.costs ?? [],
        isPinned: props?.isPinned ?? false,
    }, projectId);

    return project;
}
