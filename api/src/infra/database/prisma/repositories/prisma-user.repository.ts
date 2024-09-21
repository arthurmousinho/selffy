import { UserRepository } from "@application/repositories/user.repository";
import { PrismaService } from "../prisma.service";
import { User } from "@application/entities/user/user";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {

    constructor(
        private readonly prismaService: PrismaService
    ) {}

    public async create(user: User): Promise<void> {
        const raw = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.create({
            data: raw
        })
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
        
        if (!user) {
            return null;
        }

        return PrismaUserMapper.toDomain(user);
    }

    public async findByName(name: string): Promise<User | null> {
        const user = await this.prismaService.user.findFirst({
            where: {
                name
            }
        });
        if (!user) {
            return null;
        }
        return PrismaUserMapper.toDomain(user);
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            return null;
        }
        return PrismaUserMapper.toDomain(user);
    }

    public async findAll(): Promise<User[]> {
        const users = await this.prismaService.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return users.map(PrismaUserMapper.toDomain);
    }

    public async update(user: User): Promise<void> {
        const raw = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }

    public async delete(id: string): Promise<void> {
        await this.prismaService.user.delete({
            where: {
                id
            }
        });
    }

}