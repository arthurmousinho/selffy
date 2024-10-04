import { Project } from "@application/entities/project/project.entity";
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
        return null;
    }
    
    public async findAll(): Promise<Project[]> {
        return [];
    }

    public async update(project: Project): Promise<void> {
        console.log(project);
    }

    public async delete(id: string): Promise<void> {
        console.log(id);
    }

}