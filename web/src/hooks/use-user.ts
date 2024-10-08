import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { axios } from "@/lib/axios";
import { saveToken, TokenProps } from "./use-token";

export type UserType = "ADMIN" | "DEFAULT";
export type PlanType = "FREE" | "PREMIUM";

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    type: UserType;
    roles: string[],
    plan: PlanType;
}

interface GetAllUsersResponse {
    users: UserProps[]
}

interface SearchUserByNameResponse {
    users: UserProps[]
}

export function getAllUsers() {
    const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get('/users');
            return response.data as GetAllUsersResponse;
        }
    })

    return query;
}

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
    type: UserType;
    plan: PlanType;
}

export function createUser() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (newUser: CreateUserProps) => {
            return await axios.post('/users/signup', newUser);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: "✅ Success",
                description: "User was created successfully",
            })
        },
        onError: () => {
            toast({
                title: "❌ Error",
                description: "Something went wrong",
            });
        }
    })

    return query;
}

export function deleteUser() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: "✅ Success",
                description: "User was deleted successfully",
            });
        },
        onError: () => {
            toast({
                title: "❌ Error",
                description: "Something went wrong",
            });
        }
    });

    return query;
}

export function searchUsersByName(name?: string) {
    const query = useQuery({
        queryKey: ['users', name],
        queryFn: async () => {
            const response = await axios.get(`/users/${name}`);
            return response.data as SearchUserByNameResponse;
        },
        enabled: !!name,
        staleTime: 5000
    });

    return query;
}

interface UpdateUserProps {
    id: string;
    name: string;
    email: string;
    type: UserType;
    plan: PlanType;
}

export function updateUser() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (data: UpdateUserProps) => {
            return await axios.put('/users', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast({
                title: "✅ Success",
                description: "User was updated successfully",
            });
        },
    });

    return query;
}



interface AuthUserProps {
    email: string;
    password: string;
}

export function authUser() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const query = useMutation({
        mutationFn: async (data: AuthUserProps) => {
            const response = await axios.post('/users/login', data);
            const token = response.data.token as string;
            return token;
        },
        onSuccess: (token: string) => {
            const decodedToken = jwtDecode<TokenProps>(token);
            saveToken(token);

            if (decodedToken.type === 'ADMIN') navigate('/admin');
            if (decodedToken.type === 'DEFAULT') navigate('/');
        },
        onError: () => {
            toast({
                title: "❌ Error",
                description: "Something went wrong",
            });
        }
    });

    return query;
}