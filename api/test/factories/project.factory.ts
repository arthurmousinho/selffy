import { Project, ProjectStatus } from "@application/entities/project/project.entity";
import { randomUUID } from "crypto";
import { makeUser } from "./user.factory";
import { Task } from "@application/entities/task/task.entity";
import { User } from "@application/entities/user/user.entity";

export function makeProject(props?: { 
    title?: string, 
    description?: string, 
    revenue?: number, 
    tasks?: Task[], 
    status?: ProjectStatus,
    owner?: User, 
    color?: string, 
    icon?: string 
}) {
    const projectId = randomUUID();
    const projectOwner = props?.owner ?? makeUser(); 

    const project = new Project({
        title: props?.title ?? "Project test",
        description: props?.description ?? "Testing project description",
        revenue: props?.revenue ?? 1000,
        tasks: props?.tasks ?? [], 
        owner: projectOwner,
        status: props?.status ?? "IN_PROGRESS",
        color: props?.color ?? "#000000",
        icon: props?.icon ?? "👍🏻"
    }, projectId);

    return project;
}
