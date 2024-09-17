import { User } from "@application/entities/user/user";
import { randomUUID } from "crypto";

export function makeUser(props?: { email?: string, name?: string }): User {
    const userId = randomUUID();

    const user = new User({
        name: props?.name ?? 'New User',
        email: props?.email ?? 'new@example.com',
        password: 'password123',
        roles: ['user.edit'],
        projects: [],
        type: 'DEFAULT'
    }, userId)

    return user;
}