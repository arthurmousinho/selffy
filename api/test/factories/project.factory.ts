import { Project } from "@application/entities/project/project";
import { randomUUID } from "crypto";
import { makeUser } from "./user.factory";

export function makeProject() {
    const projectId = randomUUID();
    const projectOwner = makeUser();

    const project = new Project({
        title: "Project test",
        description: "Testing project description",
        revenue: 1000,
        tasks: [],
        owner: projectOwner,
        color: "#000000",
        icon: "👍🏻"
    }, projectId);
    
    return project;
}