import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserType } from "./use-user";

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