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