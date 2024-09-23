import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserType } from "./use-user";
import { useToast } from "./use-toast";
import { queryClient } from "@/main";

export interface RoleProps {
    id: string;
    key: string;
    userTypes: UserType[];
}

interface GetAllRolesResponse {
    roles: RoleProps[]
}

export function getAllRoles() {
    const query = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/roles');
            return response.data as GetAllRolesResponse;
        }
    })

    return query;
}


export function createRole() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (newRole: { key: string; userTypes: UserType[] }) => {
            return await axios.post('http://localhost:3000/roles', newRole);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
            toast({
                title: "✅ Success",
                description: "Role was created successfully",
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

export function updateRole() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (data: { id: string, key: string, userTypes: UserType[] }) => {
            return await axios.put(`http://localhost:3000/roles`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
            toast({
                title: "✅ Success",
                description: "Role was updated successfully",
            });
        },
    });

    return query;
}

export function deleteRole() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`http://localhost:3000/roles/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });
            toast({
                title: "✅ Success",
                description: "Role was deleted successfully",
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