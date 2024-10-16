import { PlanType, User } from "@application/entities/user/user.entity";
import { UserRepository } from "src/application/repositories/user.repository";

export class InMemoryUserRepository implements UserRepository {

    public users: User[] = [];

    public async create(user: User) {
        this.users.push(user);
    }

    public async findByEmail(email: string) {
        const user = this.users.find(
            (user) => user.getEmail() === email
        );
        return user ?? null;
    }

    public async findManyByName(params: { name: string, page: number, limit: number }) {
        const users = this.users.filter(
            (user) => user.getName().toLowerCase().includes(params.name.toLowerCase())
        );
        const pageableUsers = users.slice((params.page - 1) * params.limit, params.page * params.limit);
        return {
            data: pageableUsers,
            meta: {
                page: params.page,
                limit: params.limit,
                total: users.length,
                totalPages: Math.ceil(users.length / params.limit)
            }
        }
    }

    public async findById(id: string) {
        const user = this.users.find(
            (user) => user.getId() === id
        );
        return user;
    }

    public async findAll(page: number, limit: number) {
        const users = this.users.slice((page - 1) * limit, page * limit);
        return {
            data: users,
            meta: {
                page,
                limit,
                total: this.users.length,
                totalPages: Math.ceil(this.users.length / limit)
            }
        }
    }

    public async update(user: User) {
        const userIndex = this.users.findIndex(
            (item) => item.getId() === user.getId()
        );
        if (userIndex !== -1) {
            this.users[userIndex] = user;
        }
    }

    public async delete(id: string) {
        const userIndex = this.users.findIndex(
            (user) => user.getId() === id
        );
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }

    public async count() {
        return this.users.length;
    }

    public async countByPlan(plan: PlanType): Promise<number> {
        return this.users.filter(
            (user) => user.getPlan() === plan
        ).length;
    }

    public async countByType(type: string): Promise<number> {
        return this.users.filter(
            (user) => user.getType() === type
        ).length;
    }

    public async countUsersCreatedAfter(date: Date): Promise<number> {
        return this.users.filter(
            (user) => user.getCreatedAt() > date
        ).length;
    }

}