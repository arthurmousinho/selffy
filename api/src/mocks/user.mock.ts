import { randomUUID } from "crypto";

const getRandomPlan = () => (Math.random() > 0.5 ? 'PREMIUM' : 'FREE');
const generatePassword = () => `password${Math.floor(Math.random() * 10000)}`;

export const MOCK_USERS = [
  {
    id: randomUUID(),
    name: 'Arthur Mousinho',
    email: 'arthur@selffy.com',
    userType: 'DEFAULT',
    password: 'arthur123',
    plan: 'FREE',
  },
  ...Array.from({ length: 19 }).map((_, index) => ({
    id: randomUUID(),
    name: `User${index + 1}`,
    email: `user${index + 1}@selffy.com`,
    userType: 'DEFAULT',
    plan: getRandomPlan(), 
    password: generatePassword(),
  })),
];