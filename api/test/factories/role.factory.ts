import { Role } from "@application/entities/role/role.entity";
import { UserType } from "@application/entities/user/user.entity";
import { randomUUID } from "crypto";

export function makeRole(props?: { key?: string, userTypes?: UserType[] }) {
    const roleId = randomUUID();

    const newRole = new Role({
        key: props?.key ?? 'user.create',
        userTypes: props?.userTypes ?? ['ADMIN', 'DEFAULT']
    }, roleId);
    
    return newRole;
    
}