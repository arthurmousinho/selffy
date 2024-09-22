import { User } from "../entities/user/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<any>;
    abstract findAll(): Promise<any>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByName(name: string): Promise<any>;
    abstract findById(id: string): Promise<any>;
    abstract update(user: User): Promise<any>;
    abstract delete(id: string): Promise<void>;
}