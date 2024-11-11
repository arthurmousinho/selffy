import { Role } from "src/domain/entities/user/user.entity";
import { randomUUID } from "crypto";

function getRandomRole(): Role {
  const roles = ['ADMIN', 'FREE', 'PREMIUM'];
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex] as Role;
}

function generatePassword() {
  return `password${Math.floor(Math.random() * 10000)}`;
}

export const MOCK_USERS: {
  id: string,
  name: string,
  email: string,
  password: string,
  role: Role
}[] = [
    {
      id: randomUUID(),
      name: 'Arthur Mousinho',
      email: 'arthur@selffy.com',
      role: 'FREE',
      password: 'arthur123'
    },
    ...Array.from({ length: 19 }).map((_, index) => ({
      id: randomUUID(),
      name: `User${index + 1}`,
      email: `user${index + 1}@selffy.com`,
      role: getRandomRole(),
      password: generatePassword()
    })),
  ];