import { TaskRepository } from "@application/repositories/task.repository";
import { PrismaService } from "../prisma.service";
import { Task, TaskPriority, TaskStatus } from "@application/entities/task/task.entity";
import { PrismaTaskMapper } from "../mappers/prisma-task.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaTaskRepository implements TaskRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(task: Task): Promise<void> {
        const raw = PrismaTaskMapper.toPrisma(task)
        await this.prismaService.task.create({
            data: raw
        })
    }

    public async findAll(): Promise<Task[]> {
        const tasks = await this.prismaService.task.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return tasks.map(task => PrismaTaskMapper.toDomain(task))
    }

    public async findById(id: string): Promise<Task | null> {
        const task = await this.prismaService.task.findUnique({
            where: {
                id
            }
        })
        if (!task) {
            return null
        }
        return PrismaTaskMapper.toDomain(task)
    }

    public async update(task: Task): Promise<void> {
        const raw = PrismaTaskMapper.toPrisma(task)
        await this.prismaService.task.update({
            where: {
                id: task.getId()
            },
            data: raw
        })
    }

    public async delete(id: string): Promise<void> {
        await this.prismaService.task.delete({
            where: {
                id
            }
        })
    }

    public async findManyByTitle(title: string): Promise<Task[]> {
        const tasks = await this.prismaService.task.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive'
                }
            }
        })
        return tasks.map(task => PrismaTaskMapper.toDomain(task))
    }

    public async count(): Promise<number> {
        const count = await this.prismaService.task.count()
        return count
    }

    public async countByStatus(status: TaskStatus): Promise<number> {
        const count = await this.prismaService.task.count({
            where: {
                status: status
            }
        })
        return count
    }

    public async countByPriority(priority: TaskPriority): Promise<number> {
        const count = await this.prismaService.task.count({
            where: {
                priority: priority
            }
        })
        return count
    }

}