import { Role } from "@application/entities/role/role.entity";

export abstract class RoleRepository {
    abstract create(role: Role): Promise<void>;
    abstract findAll(): Promise<Role[]>;
    abstract findById(id: string): Promise<Role | null>;
    abstract findByKey(key: string): Promise<Role | null>;
    abstract update(role: Role): Promise<void>;
    abstract delete(id: string): Promise<void>;
}