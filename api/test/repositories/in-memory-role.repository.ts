import { Role } from "@application/entities/role/role";
import { RoleRepository } from "@application/repositories/role.repository";

export class InMemoryRoleRepository implements RoleRepository {
    private roles: Role[] = [];

    public async create(role: Role): Promise<Role> {
        this.roles.push(role);
        return role;
    }
    
    public async findById(id: string): Promise<Role | null> {
        return this.roles.find(r => r.getId() === id) || null;
    }

    public async findAll(): Promise<Role[]> {
        return this.roles;
    }

    public async update(role: Role): Promise<any> {
        const index = this.roles.findIndex(r => r.getId() === role.getId());
        if (index !== -1) {
            this.roles[index] = role;
            return role;
        }
        return null;
    }

    public async delete(id: string) {
        const index = this.roles.findIndex(r => r.getId() === id);
        if (index !== -1) {
            this.roles.splice(index, 1);
        }
    }
}