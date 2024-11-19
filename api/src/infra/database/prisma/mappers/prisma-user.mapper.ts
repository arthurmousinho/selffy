import { User } from "src/domain/entities/user/user.entity";
import { User as RawUser } from "@prisma/client";
import { Project as RawProject } from "@prisma/client";
import { Task as RawTask } from "@prisma/client";
import { Cost as RawCost } from "@prisma/client";
import { Project } from "@domain/entities/project/project.entity";
import { PrismaTaskMapper } from "./prisma-task.mapper";
import { PrismaCostMapper } from "./prisma-cost.mapper";
import { Cost } from "@domain/entities/cost/cost.entity";

export class PrismaUserMapper {

    public static toPrisma(user: User): RawUser {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        };
    }

    public static toDomain(
        raw: RawUser &
        { projects?: (RawProject & { tasks?: RawTask[] } & { costs?: RawCost[] })[] }
    ): User {
        const user = new User({
            name: raw.name,
            email: raw.email,
            password: raw.password,
            role: raw.role,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, raw.id);

        const projects = raw.projects?.map((project) => {
            const mappedProject = new Project({
                title: project.title,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt,
                owner: user,
                revenue: project.revenue,
                description: project.description,
                status: project.status,
                icon: project.icon,
                color: project.color,
            }, project.id);

            const tasks = project.tasks?.map(PrismaTaskMapper.toDomain);
            tasks?.map((task) => mappedProject.addTask(task));

            const costs = project.costs?.map(cost => new Cost({
                title: cost.title,
                createdAt: cost.createdAt,
                updatedAt: cost.updatedAt,
                value: cost.value,
                project: mappedProject,
            }, cost.id))
            costs?.map(cost => mappedProject.addCost(cost));

            return mappedProject;
        });


        projects?.map(project => user.addProject(project));
        return user;
    }

}