import { Role } from "@application/entities/role/role.entity";
import { RoleRepository } from "@application/repositories/role.repository";

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

    public async findManyByKey(key: string): Promise<Role[]> {
        const roles = this.roles.filter(
            (item) => item.getKey().includes(key)
        );
        return roles;
    }

    public async findAll(): Promise<Role[]> {
        return this.roles;
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

}