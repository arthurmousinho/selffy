import { Role } from "@application/entities/role/role";
import { RoleRepository } from "@application/repositories/role.repository";

export class InMemoryRoleRepository implements RoleRepository {
    
    private roles: Role[] = [];

    public async create(role: Role): Promise<Role> {
        this.roles.push(role);
        return role;
    }
    
    public async findById(id: string): Promise<Role | null> {
        const role = this.roles.find(
            (item) => item.getId() === id
        );
        return role || null;
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

}