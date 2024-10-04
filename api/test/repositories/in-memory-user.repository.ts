import { User } from "@application/entities/user/user.entity";
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

    public async findManyByName(name: string) {
        const users = this.users.filter(
            (user) => user.getName() === name
        );
        return users;
    }

    public async findById(id: string) {
        const user = this.users.find(
            (user) => user.getId() === id
        );
        return user;
    }

    public async findAll() {
        return this.users;
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

}