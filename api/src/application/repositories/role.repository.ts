import { Role } from "@application/entities/role/role.entity";
import { UserType } from "@application/entities/user/user.entity";
import { Pageable } from "@application/types/pageable.type";

export abstract class RoleRepository {
    abstract create(role: Role): Promise<void>;
    abstract findAll(page: number, limit: number): Promise<Pageable<Role>>;
    abstract createMany(roles: Role[]): Promise<void>;
    abstract findById(id: string): Promise<Role | null>;
    abstract findByKey(key: string): Promise<Role | null>;
    abstract findManyByKey(params: { key: string, page: number, limit: number }): Promise<Pageable<Role>>;
    abstract update(role: Role): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract getRolesForAdminUser(): Promise<Role[]>;
    abstract getRolesForDefaultUser(): Promise<Role[]>;
    abstract count(): Promise<number>;
    abstract countByUserType(userType: UserType): Promise<number>;
}