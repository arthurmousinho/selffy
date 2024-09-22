import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useToast } from "./use-toast";

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
            const response = await axios.get('http://localhost:3000/users');
            return response.data as Response;
        }
    })

    return query;
}

export function createUser() {
    const { toast } = useToast();

    const query = useMutation({
        mutationFn: async (newUser: { name: string; email: string; password: string }) => {
            return await axios.post('http://localhost:3000/users/signup', newUser);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: "✅ Success",
                description: "User was created successfully",
            })
        },
    })

    return query;
}

export function deleteUser() {
    const { toast } = useToast();

    const query = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`http://localhost:3000/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: "✅ Success",
                description: "User was deleted successfully",
            });
        },
    });

    return query;
}

export function searchUsersByName(name?: string) {
    const query = useQuery({
        queryKey: ['users', name],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/users/${name}`);
            return response.data as Response;
        },
        enabled: !!name,
        staleTime: 5000
    });

    return query;
}