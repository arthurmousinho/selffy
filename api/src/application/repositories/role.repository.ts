import { Role } from "@application/entities/role/role.entity";

export abstract class RoleRepository {
    abstract create(role: Role): Promise<void>;
    abstract findAll(): Promise<Role[]>;
    abstract createMany(roles: Role[]): Promise<void>;
    abstract findById(id: string): Promise<Role | null>;
    abstract findByKey(key: string): Promise<Role | null>;
    abstract findManyByKey(key: string): Promise<Role[]>;
    abstract update(role: Role): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract getRolesForAdminUser(): Promise<Role[]>;
    abstract getRolesForDefaultUser(): Promise<Role[]>;
    abstract count(): Promise<number>;
}