import { Role } from "@application/entities/role/role.entity";
import { UserType } from "@application/entities/user/user.entity";
import { RoleRepository } from "@application/repositories/role.repository";
import { Pageable } from "@application/types/pageable.type";

export class InMemoryRoleRepository implements RoleRepository {

    private roles: Role[] = [];

    public async create(role: Role): Promise<void> {
        this.roles.push(role);
    }

    public async createMany(roles: Role[]): Promise<void> {
        this.roles.push(...roles);
    }

    public async findById(id: string): Promise<Role | null> {
        const role = this.roles.find(
            (item) => item.getId() === id
        );
        return role || null;
    }

    public async findByKey(key: string): Promise<Role | null> {
        const role = this.roles.find(
            (item) => item.getKey() === key
        );
        return role || null;
    }

    public async findManyByKey(params: { key: string, page: number, limit: number }): Promise<Pageable<Role>> {
        const roles = this.roles.filter(
            (item) => item.getKey().includes(params.key)
        ).slice((params.page - 1) * params.limit, params.page * params.limit);
        
        return {
            data: roles,
            meta: {
                page: params.page,
                limit: params.limit,
                total: roles.length,
                totalPages: Math.ceil(roles.length / params.limit)
            }
        }
    }

    public async findAll(page: number, limit: number): Promise<Pageable<Role>> {
        const roles = this.roles.slice((page - 1) * limit, page * limit);
        return {
            data: roles,
            meta: {
                page,
                limit,
                total: this.roles.length,
                totalPages: Math.ceil(this.roles.length / limit)
            }
        }
    }

    public async update(role: Role): Promise<void> {
        const index = this.roles.findIndex(
            (item) => item.getId() === role.getId()
        );
        if (index !== -1) {
            this.roles[index] = role;
        }
    }

    public async delete(id: string) {
        const index = this.roles.findIndex(
            (item) => item.getId() === id
        );
        if (index !== -1) {
            this.roles.splice(index, 1);
        }
    }

    public async getRolesForAdminUser(): Promise<Role[]> {
        const roles = this.roles.filter(
            (item) => item.getKey() === 'ADMIN'
        );
        return roles;
    }

    public async getRolesForDefaultUser(): Promise<Role[]> {
        const roles = this.roles.filter(
            (item) => item.getKey() === 'DEFAULT'
        );
        return roles;
    }

    public async count(): Promise<number> {
        return this.roles.length;
    }

    public async countByUserType(userType: UserType): Promise<number> {
        const roles = this.roles.filter(
            (item) => item.getKey() === userType
        );
        return roles.length;
    }

}