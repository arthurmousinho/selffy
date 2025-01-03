import { Role, User } from "@domain/entities/user/user.entity";
import { randomUUID } from "crypto";

export function makeUser(props?: { 
    id?: string, 
    email?: string, 
    name?: string, 
    role?: Role 
    password?: string
}): User {

    const date = new Date();
    date.setDate(date.getDate() - 1); // yesterday

    const user = new User({
        email: props?.email ?? 'test@test.com',
        name: props?.name ?? 'test',
        password: props?.password ?? '123456',
        role: props?.role ?? 'FREE',
        updatedAt: date,
        createdAt: date,
    }, props?.id ?? randomUUID());

    return user;

}