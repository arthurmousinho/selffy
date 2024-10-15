import { Pageable } from "@application/types/pageable.type";
import { PlanType, User, UserType } from "../entities/user/user.entity";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findAll(page: number, limit: number): Promise<Pageable<User>>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findManyByName(name: string): Promise<User[]>;
    abstract findById(id: string): Promise<any>;
    abstract update(user: User): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract count(): Promise<number>;
    abstract countByPlan(plan: PlanType): Promise<number>;
    abstract countByType(type: UserType): Promise<number>;
    abstract countUsersCreatedAfter(date: Date): Promise<number>;
}