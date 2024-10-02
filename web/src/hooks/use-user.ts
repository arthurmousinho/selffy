import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export type UserType = "ADMIN" | "DEFAULT";

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    type: UserType;
    roles: { key: string }[]
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
            const response = await axios.get('http://localhost:3000/users');
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
}

export function createUser() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (newUser: CreateUserProps) => {
            return await axios.post('http://localhost:3000/users/signup', newUser);
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
            return await axios.delete(`http://localhost:3000/users/${id}`);
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
            const response = await axios.get(`http://localhost:3000/users/${name}`);
            return response.data as SearchUserByNameResponse;
        },
        enabled: !!name,
        staleTime: 5000
    });

    return query;
}

export function updateUser() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (data: { id: string, name: string, email: string }) => {
            return await axios.put(`http://localhost:3000/users`, data);
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

interface TokenProps {
    sub: string;
    email: string;
    type: UserType;
    roles: string[];
    iat: number;
    exp: number;
}

export function authUser() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const query = useMutation({
        mutationFn: async (data: { email: string, password: string }) => {
            const response = await axios.post('http://localhost:3000/users/login', data);
            const token = response.data.token;
            return token;
        },
        onSuccess: (token: string) => {
            const decodedToken = jwtDecode<TokenProps>(token);
            const expirationDate = new Date(decodedToken.exp * 1000);

            Cookies.set('selffy_token', token, { expires: expirationDate });

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