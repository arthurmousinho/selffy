import { Role } from "@application/entities/role/role";
import { randomUUID } from "crypto";

export function makeRole() {
    const roleId = randomUUID();

    const newRole = new Role({
        key: 'user.create'
    }, roleId);
    
    return newRole;
}