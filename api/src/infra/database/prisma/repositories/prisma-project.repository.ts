import { Project, ProjectStatus } from "@application/entities/project/project.entity";
import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaProjectMapper } from "../mappers/prisma-project.mapper";
import { Pageable } from "@application/types/pageable.type";

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    public async create(project: Project): Promise<void> {
        const raw = PrismaProjectMapper.toPrisma(project);
        await this.prismaService.project.create({
            data: raw
        })
    }

    public async createMany(projects: Project[]): Promise<void> {
        const raw = projects.map(PrismaProjectMapper.toPrisma);
        await this.prismaService.project.createMany({
            data: raw
        })
    }

    public async findById(id: string): Promise<Project | null> {
        const project = await this.prismaService.project.findUnique({
            where: {
                id
            },
            include: {
                owner: true
            }
        });
        if (!project) {
            return null;
        }
        return PrismaProjectMapper.toDomain(project);
    }

    public async findAll(page: number = 1, limit: number = 1): Promise<Pageable<Project>> {
        const [projects, total] = await Promise.all([
            this.prismaService.project.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    owner: true
                }
            }),
            this.prismaService.project.count()
        ]);
        return {
            data: projects.map(PrismaProjectMapper.toDomain),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    public async update(project: Project): Promise<void> {
        const raw = PrismaProjectMapper.toPrisma(project);
        await this.prismaService.project.update({
            where: {
                id: raw.id,
            },
            data: raw
        })
    }

    public async delete(id: string): Promise<void> {
        await this.prismaService.project.delete({
            where: {
                id
            }
        })
    }

    public async count(): Promise<number> {
        return await this.prismaService.project.count();
    }

    public async countProjectsCreatedAfter(date: Date): Promise<number> {
        return await this.prismaService.project.count({
            where: {
                createdAt: {
                    gte: date
                }
            }
        });
    }

    public async findManyByTitle(params: { title: string; page: number; limit: number; }): Promise<Pageable<Project>> {
        const [projects, total] = await Promise.all([
            this.prismaService.project.findMany({
                where: {
                    title: {
                        contains: params.title,
                        mode: 'insensitive'
                    }
                },
                skip: (params.page - 1) * params.limit,
                take: params.limit,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    owner: true
                }
            }),
            this.prismaService.project.count({
                where: {
                    title: {
                        contains: params.title,
                        mode: 'insensitive'
                    }
                }
            })
        ]);
        return {
            data: projects.map(PrismaProjectMapper.toDomain),
            meta: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages: Math.ceil(total / params.limit)
            }
        }
    }

    public async countByStatus(status: ProjectStatus): Promise<number> {
        return await this.prismaService.project.count({
            where: {
                status
            }
        });
    }

    public async countByOwnerId(ownerId: string): Promise<number> {
        return await this.prismaService.project.count({
            where: {
                ownerId
            }
        });
    }

    public async findByStatus(status: ProjectStatus): Promise<Project[]> {
        const projects = await this.prismaService.project.findMany({
            where: {
                status
            },
            include: {
                owner: true
            }
        });
        return projects.map(PrismaProjectMapper.toDomain);
    }

    public async findByOwnerId(params: { ownerId: string; page: number; limit: number; }): Promise<Pageable<Project>> {
        const [ projects, total ] = await Promise.all([
            this.prismaService.project.findMany({
                where: {
                    ownerId: params.ownerId
                },
                skip: (params.page - 1) * params.limit,
                take: params.limit,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    owner: true
                }
            }),
            this.prismaService.project.count({
                where: {
                    ownerId: params.ownerId
                }
            })
        ]);
        return {
            data: projects.map(PrismaProjectMapper.toDomain),
            meta: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages: Math.ceil(total / params.limit)
            }
        }
    }

    public async sumRevenues() {
        const sum = await this.prismaService.project.aggregate({
            _sum: {
                revenue: true
            }
        });
        return sum._sum.revenue || 0;
    }

}