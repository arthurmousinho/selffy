import { Project, ProjectStatus } from "@application/entities/project/project.entity";
import { ProjectRepository } from "@application/repositories/project.repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaProjectMapper } from "../mappers/prisma-project.mapper";

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) {}

    public async create(project: Project): Promise<void> {
        const raw = PrismaProjectMapper.toPrisma(project);
        await this.prismaService.project.create({
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
    
    public async findAll(): Promise<Project[]> {
        const projects = await this.prismaService.project.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include:  {
                owner: true
            }
        });
        return projects.map(PrismaProjectMapper.toDomain);
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

    public async findManyByTitle(title: string): Promise<Project[]> {
        const projects = await this.prismaService.project.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive'
                }
            },
            include: {
                owner: true
            }
        });
        return projects.map(PrismaProjectMapper.toDomain);
    }

    public async countByStatus(status: ProjectStatus): Promise<number> {
        return await this.prismaService.project.count({
            where: {
                status
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

    public async sumRevenues(){
        const sum = await this.prismaService.project.aggregate({
            _sum: {
                revenue: true
            }
        });
        return sum._sum.revenue || 0;
    }

}