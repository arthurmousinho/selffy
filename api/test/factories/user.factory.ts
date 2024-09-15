import { User } from "@application/entities/user/user";
import { randomUUID } from "crypto";

export function makeUser(): User {
    const userId = randomUUID();

    const user = new User({
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
        roles: ['user.edit'],
        projects: [],
        type: 'DEFAULT'
    }, userId)

    return user;
}