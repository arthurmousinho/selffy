import { useQuery } from "@tanstack/react-query";

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    type: "ADMIN" | "DEFAULT";
    roles: { key: string }[]
}

interface Response {
    users: UserProps[]
}

export function getAllUsers() {
    const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/users')
            const data = await response.json();
            return data as Response;
        }
    })

    return query;
}