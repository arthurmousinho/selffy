import { useMutation, useQuery } from "@tanstack/react-query";
import { UserType } from "./use-user";
import { useToast } from "./use-toast";
import { queryClient } from "@/main";
import { axios } from "@/lib/axios";

export interface RoleProps {
    id: string;
    key: string;
    userTypes: UserType[];
}

interface GetAllRolesResponse {
    roles: RoleProps[]
}

interface SearchRoleByKeyResponse {
    roles: RoleProps[]
}

export function getAllRoles() {
    const query = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const response = await axios.get('/roles');
            return response.data as GetAllRolesResponse;
        }
    })

    return query;
}

interface CreateRoleProps {
    key: string;
    userTypes: UserType[];
}

export function createRole() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (newRole: CreateRoleProps) => {
            return await axios.post('/roles', newRole);
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

interface UpdateRoleProps {
    id: string;
    key: string;
    userTypes: UserType[];
}

export function updateRole() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (data: UpdateRoleProps) => {
            return await axios.put('/roles', data);
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
            return await axios.delete(`/roles/${id}`);
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

export function searchRolesByKey(key?: string) {
    const query = useQuery({
        queryKey: ['roles', key],
        queryFn: async () => {
            const response = await axios.get(`/roles/${key}`);
            return response.data as SearchRoleByKeyResponse;
        },
        enabled: !!key,
        staleTime: 5000
    });

    return query;
}