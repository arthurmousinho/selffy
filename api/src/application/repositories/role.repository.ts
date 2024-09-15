import { Role } from "@application/entities/role/role";

export abstract class RoleRepository {
    abstract create(role: Role): Promise<Role>;
    abstract findAll(): Promise<Role[]>;
    abstract findById(id: string): Promise<Role | null>;
    abstract update(role: Role): Promise<void>;
    abstract delete(id: string): Promise<void>;
}