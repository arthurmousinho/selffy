import { TaskRepository } from "@application/repositories/task.repository";
import { PrismaService } from "../prisma.service";
import { Task, TaskPriority, TaskStatus } from "@application/entities/task/task.entity";
import { PrismaTaskMapper } from "../mappers/prisma-task.mapper";
import { Injectable } from "@nestjs/common";
import { Pageable } from "@application/types/pageable.type";

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

    public async createMany(tasks: Task[]): Promise<void> {
        const raw = tasks.map(task => PrismaTaskMapper.toPrisma(task))
        await this.prismaService.task.createMany({
            data: raw
        })
    }

    public async findAll(page: number, limit: number): Promise<Pageable<Task>> {
        const [tasks, total] = await Promise.all([
            this.prismaService.task.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            this.prismaService.project.count()
        ]);

        return {
            data: tasks.map(PrismaTaskMapper.toDomain),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
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

    public async findManyByTitle(params: { title: string, page: number, limit: number }): Promise<Pageable<Task>> {
        const [tasks, total] = await Promise.all([
            this.prismaService.task.findMany({
                skip: (params.page - 1) * params.limit,
                take: params.limit,
                where: {
                    title: {
                        contains: params.title,
                        mode: 'insensitive'
                    }
                }
            }),
            this.prismaService.task.count({
                where: {
                    title: {
                        contains: params.title,
                        mode: 'insensitive'
                    }
                }
            })
        ])

        return {
            data: tasks.map(PrismaTaskMapper.toDomain),
            meta: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages: Math.ceil(total / params.limit)
            }
        };
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