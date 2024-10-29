import { Pageable } from "@application/types/pageable.type";
import { Role, User } from "../entities/user/user.entity";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findAll(page: number, limit: number): Promise<Pageable<User>>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findManyByName(params: { name: string, page: number, limit: number }): Promise<Pageable<User>>;
    abstract findById(id: string): Promise<User | null>;
    abstract update(user: User): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract count(): Promise<number>;
    abstract countByRole(role: Role): Promise<number>;
    abstract countUsersCreatedAfter(date: Date): Promise<number>;
}