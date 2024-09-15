import { Role } from "@application/entities/role/role";
import { randomUUID } from "crypto";

export function makeRole() {
    const newRole = new Role({
        key: 'user.create'
    }, randomUUID());
    
    return newRole;
}