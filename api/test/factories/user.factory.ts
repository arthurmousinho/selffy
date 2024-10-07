import { User } from "@application/entities/user/user.entity";
import { randomUUID } from "crypto";
import { makeRole } from "./role.factory";

export function makeUser(props?: { id?: string, email?: string, name?: string }): User {
    const user = new User({
        email: props?.email ?? 'test@test.com',
        name: props?.name ?? 'test',
        password: '123456',
        roles: [
            makeRole()
        ]
    }, props?.id ?? randomUUID());

    return user;
}