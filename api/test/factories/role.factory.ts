import { Role } from "@application/entities/role/role";
import { randomUUID } from "crypto";

export function makeRole(props?: { key: string }) {
    const roleId = randomUUID();

    const newRole = new Role({
        key: props?.key ?? 'user.create'
    }, roleId);
    
    return newRole;
}