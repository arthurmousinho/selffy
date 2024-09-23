import { Role } from "@application/entities/role/role.entity";

export class RoleViewModel {
    
    static toHTTP(role: Role) {
        return {
            id: role.getId(),
            key: role.getKey(),
            userTypes: role.getUserTypes(),
            createdAt: role.getCreatedAt(),
            updatedAt: role.getUpdatedAt()
        }
    }

}